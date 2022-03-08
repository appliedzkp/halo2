//! This module implements a fast method for multi-scalar multiplications.

use core::slice;
use std::{
    convert::TryInto,
    env::var,
    mem::{self, size_of},
    time::Instant,
};

use super::multicore;
pub use ff::Field;
use group::{
    ff::{BatchInvert, PrimeField},
    prime::PrimeCurveAffine,
    Group as _,
};

pub use pairing::arithmetic::*;

fn num_bits(value: usize) -> usize {
    (0usize.leading_zeros() - value.leading_zeros()) as usize
}

fn get_wnaf_size_bits(num_bits: usize, w: usize) -> usize {
    (num_bits + w - 1) / w
}

fn get_wnaf_size(w: usize) -> usize {
    get_wnaf_size_bits(127, w)
}

fn get_num_rounds(c: usize) -> usize {
    get_wnaf_size(c + 1)
}

fn get_num_buckets(c: usize) -> usize {
    (1 << c) + 1
}

fn get_wnaf(value: u128, w: usize, num_rounds: usize, wnaf: &mut [u32], stride: usize) {
    fn get_bits_at(v: u128, pos: usize, num: usize) -> usize {
        ((v >> pos) & ((1 << num) - 1)) as usize
    }

    let mut borrow = 0;
    let max = 1 << (w - 1);
    for idx in 0..num_rounds {
        let b = get_bits_at(value, idx * w, w) + borrow;
        if b >= max {
            wnaf[idx * stride] = (0x80000000 | ((1 << w) - b)) as u32;
            borrow = 1;
        } else {
            wnaf[idx * stride] = b as u32;
            borrow = 0;
        }
    }
    assert_eq!(borrow, 0);
}

fn get_best_c(num_points: usize) -> usize {
    if num_points >= 262144 {
        15
    } else if num_points >= 32768 {
        12
    } else if num_points >= 8192 {
        10
    } else if num_points >= 2048 {
        9
    } else {
        7
    }
}

/// MultiExp
#[derive(Debug, Default)]
pub struct MultiExp<'a, C: CurveAffine> {
    /// The bases
    bases: Vec<C>,
    /// Memory to store the points in the addition tree
    points: Vec<C>,
    /// Memory to store wnafs
    wnafs: Vec<u32>,
    /// Memory to store bucket sizes
    bucket_sizes: Vec<usize>,
    /// Memory to store bucket offsets
    bucket_offsets: Vec<usize>,
    /// Memory to store the point data
    point_data: Vec<u32>,
    /// Memory to store the output indices
    output_indices: Vec<u32>,
    /// Memory to store the base positions
    base_positions: Vec<u32>,
    /// Memory to store the scatter maps
    scatter_map: Vec<ScatterData>,
    /// Data used in the different rounds
    rounds: Vec<RoundData<'a>>,
}

/// RoundData
#[derive(Debug, Default)]
struct RoundData<'a> {
    /// Number of levels in the addition tree
    pub num_levels: usize,
    /// The length of each level in the addition tree
    pub level_sizes: Vec<usize>,
    /// The offset to each level in the addition tree
    pub level_offset: Vec<usize>,
    /// The size of each bucket
    pub bucket_sizes: &'a mut [usize],
    /// The offset of each bucket
    pub bucket_offsets: &'a mut [usize],
    /// The point to use for each coefficient
    pub point_data: &'a mut [u32],
    /// The output index in the point array for each pair addition
    pub output_indices: &'a mut [u32],
    /// The point to use on the first level in the addition tree
    pub point_locations: &'a mut [u32],
    /// List of points that are scattered to the addition tree
    pub scatter_map: &'a mut [ScatterData],
    /// The length of scatter_map
    pub scatter_map_len: usize,
}

/// ScatterData
#[derive(Default, Debug, Clone)]
struct ScatterData {
    /// The position in the addition tree to store the point
    pub position: u32,
    /// The point to write
    pub point_data: u32,
}

impl<'a, C: CurveAffine> MultiExp<'a, C> {
    /// Create a new MultiExp instance with the specified bases
    pub fn new(bases: &[C]) -> Self {
        let mut endo_bases = vec![C::identity(); bases.len() * 2];

        // Generate the endomorphism bases
        let num_threads = multicore::current_num_threads();
        multicore::scope(|scope| {
            let num_points_per_thread = (bases.len() + num_threads - 1) / num_threads;
            for (endo_bases, bases) in endo_bases
                .chunks_mut(num_points_per_thread * 2)
                .zip(bases.chunks(num_points_per_thread))
            {
                scope.spawn(move |_| {
                    for (idx, base) in bases.iter().enumerate() {
                        endo_bases[idx * 2] = *base;
                        endo_bases[idx * 2 + 1] = C::get_endomorphism_base(base);
                    }
                });
            }
        });

        Self {
            bases: endo_bases,
            ..Default::default()
        }
    }

    /// Allocate memory for the msm evalution
    fn allocate(&mut self, num_points: usize, c: usize) {
        let num_points = num_points * 2;
        let num_buckets = get_num_buckets(c);
        let num_rounds = get_num_rounds(c);
        let tree_size = num_points * 2 + num_buckets;
        let num_points_all_rounds = num_rounds * num_points;
        let num_buckets_all_rounds = num_rounds * num_buckets;
        let tree_size_all_rounds = num_rounds * tree_size;

        // Allocate memory when necessary
        if self.points.len() < tree_size {
            self.points.resize(tree_size, C::generator());
        }
        if self.wnafs.len() < num_points_all_rounds {
            self.wnafs.resize(num_points_all_rounds, 0u32);
        }
        if self.bucket_sizes.len() < num_buckets_all_rounds {
            self.bucket_sizes.resize(num_buckets_all_rounds, 0usize);
        }
        if self.bucket_offsets.len() < num_buckets_all_rounds {
            self.bucket_offsets.resize(num_buckets_all_rounds, 0usize);
        }
        if self.point_data.len() < num_points_all_rounds {
            self.point_data.resize(num_points_all_rounds, 0u32);
        }
        if self.output_indices.len() < tree_size_all_rounds {
            self.output_indices.resize(tree_size_all_rounds, 0u32);
        }
        if self.base_positions.len() < num_points_all_rounds {
            self.base_positions.resize(num_points_all_rounds, 0u32);
        }
        if self.scatter_map.len() < num_buckets_all_rounds {
            self.scatter_map
                .resize(num_buckets_all_rounds, ScatterData::default());
        }

        // Use the allocated memory above to init the memory used for each round.
        // This way the we don't need to reallocate memory for each msm with
        // a different configuration (different number of points or different bucket width)
        self.rounds = Vec::with_capacity(num_rounds);
        for round_idx in 0..num_rounds {
            #[allow(unsafe_code)]
            let bucket_sizes = unsafe {
                slice::from_raw_parts_mut(
                    self.bucket_sizes
                        .as_mut_ptr()
                        .offset((round_idx * num_buckets) as isize),
                    num_buckets,
                )
            };
            #[allow(unsafe_code)]
            let bucket_offsets = unsafe {
                slice::from_raw_parts_mut(
                    self.bucket_offsets
                        .as_mut_ptr()
                        .offset((round_idx * num_buckets) as isize),
                    num_buckets,
                )
            };
            #[allow(unsafe_code)]
            let point_data = unsafe {
                slice::from_raw_parts_mut(
                    self.point_data
                        .as_mut_ptr()
                        .offset((round_idx * num_points) as isize),
                    num_points,
                )
            };
            #[allow(unsafe_code)]
            let output_indices = unsafe {
                slice::from_raw_parts_mut(
                    self.output_indices
                        .as_mut_ptr()
                        .offset((round_idx * tree_size) as isize),
                    tree_size,
                )
            };
            #[allow(unsafe_code)]
            let point_locations = unsafe {
                slice::from_raw_parts_mut(
                    self.base_positions
                        .as_mut_ptr()
                        .offset((round_idx * num_points) as isize),
                    num_points,
                )
            };
            #[allow(unsafe_code)]
            let scatter_map = unsafe {
                slice::from_raw_parts_mut(
                    self.scatter_map
                        .as_mut_ptr()
                        .offset((round_idx * num_buckets) as isize),
                    num_buckets,
                )
            };
            self.rounds.push(RoundData {
                num_levels: 0,
                level_sizes: vec![],
                level_offset: vec![],
                bucket_sizes,
                bucket_offsets,
                point_data,
                output_indices,
                point_locations,
                scatter_map,
                scatter_map_len: 0,
            });
        }
    }

    /// Performs a multi-exponentiation operation.
    pub fn allocate_for(&mut self, num_points: usize, c: usize) {
        self.allocate(num_points, c);
    }

    /// Performs a multi-exponentiation operation.
    pub fn evaluate(&mut self, coeffs: &[C::Scalar]) -> C::Curve {
        self.evaluate_with(coeffs, get_best_c(coeffs.len()))
    }

    /// Performs a multi-exponentiation operation.
    pub fn evaluate_with(&mut self, coeffs: &[C::Scalar], c: usize) -> C::Curve {
        assert!(coeffs.len() * 2 <= self.bases.len());

        // Allocate more memory if required
        self.allocate(coeffs.len(), c);

        // Get the bases for the coefficients
        let bases = &self.bases[..coeffs.len() * 2];

        let start = start_measure(format!("multiexp {} ({})", coeffs.len(), c), false);
        if coeffs.len() >= 16 {
            let num_points = coeffs.len() * 2;
            let w = c + 1;
            let num_rounds = get_num_rounds(c);

            // Prepare WNAFs of all coefficients for all rounds
            calculate_wnafs::<C>(coeffs, &mut self.wnafs, c);
            // Sort WNAFs into buckets for all rounds
            sort::<C>(
                &mut self.wnafs[0..num_rounds * num_points],
                &mut self.rounds,
                c,
            );
            // Calculate addition trees for all rounds
            create_addition_tree(&mut self.rounds, c);

            // Now process each round individually
            let mut partials = vec![C::Curve::identity(); num_rounds];
            for (round_idx, acc) in partials.iter_mut().enumerate() {
                // Scatter the odd points in the odd length buckets to the addition tree
                do_point_scatter::<C>(&self.rounds[round_idx], &bases, &mut self.points);
                // Do all bucket additions
                do_batch_additions::<C>(&self.rounds[round_idx], &bases, &mut self.points);
                // Get the final result of the round
                *acc = calculate_round_result::<C>(&self.rounds[round_idx], &mut self.points, c);
            }

            // Accumulate round results
            let mut res = partials[num_rounds - 1];
            for i in (0..num_rounds - 1).rev() {
                for _ in 0..w {
                    res = res.double();
                }
                res = res + partials[i];
            }
            stop_measure(start);
            res
        } else {
            let mut acc = C::Curve::identity();
            for idx in 0..coeffs.len() {
                acc += bases[idx * 2] * coeffs[idx];
            }
            stop_measure(start);
            acc
        }
    }
}

#[derive(Clone, Copy)]
struct ThreadBox<T>(*mut T, usize);
#[allow(unsafe_code)]
unsafe impl<T> Send for ThreadBox<T> {}
#[allow(unsafe_code)]
unsafe impl<T> Sync for ThreadBox<T> {}

/// Wraps an array so it can be passed into a thread without borrow checks.
impl<T> ThreadBox<T> {
    fn from(data: &mut [T]) -> Self {
        Self(data.as_mut_ptr(), data.len())
    }

    fn unwrap(&self) -> &mut [T] {
        #[allow(unsafe_code)]
        unsafe {
            slice::from_raw_parts_mut(self.0, self.1)
        }
    }
}

fn calculate_wnafs<C: CurveAffine>(coeffs: &[C::Scalar], wnafs: &mut [u32], c: usize) {
    let num_threads = multicore::current_num_threads();
    let num_points = coeffs.len() * 2;
    let num_rounds = get_num_rounds(c);
    let w = c + 1;

    let start = start_measure(format!("wnaf {} ({})", coeffs.len(), num_threads), false);
    let wnafs_box = ThreadBox::from(wnafs);
    let chunk_size = (coeffs.len() + num_threads - 1) / num_threads;
    multicore::scope(|scope| {
        for (thread_idx, coeffs) in coeffs.chunks(chunk_size).enumerate() {
            scope.spawn(move |_| {
                let wnafs = &mut wnafs_box.unwrap()[thread_idx * chunk_size * 2..];
                for idx in 0..coeffs.len() {
                    let (p0, p1) = C::get_endomorphism_scalars(&coeffs[idx]);
                    get_wnaf(p0, w, num_rounds, &mut wnafs[idx * 2..], num_points);
                    get_wnaf(p1, w, num_rounds, &mut wnafs[idx * 2 + 1..], num_points);
                }
            });
        }
    });
    stop_measure(start);
}

fn radix_sort(wnafs: &mut [u32], round: &mut RoundData) {
    let bucket_sizes = &mut round.bucket_sizes;
    let bucket_offsets = &mut round.bucket_offsets;

    // Calculate bucket sizes
    bucket_sizes.fill_with(|| 0);
    for wnaf in wnafs.iter() {
        bucket_sizes[(wnaf & 0x7FFFFFFF) as usize] += 1;
    }

    // Calculate bucket offsets
    let mut offset = 0;
    let mut max_bucket_size = 0;
    bucket_offsets[0] = offset;
    offset += bucket_sizes[0];
    for (bucket_offset, bucket_size) in bucket_offsets
        .iter_mut()
        .skip(1)
        .zip(bucket_sizes.iter().skip(1))
    {
        *bucket_offset = offset;
        offset += bucket_size;
        max_bucket_size = max_bucket_size.max(*bucket_size);
    }
    // Number of levels we need in our addition tree
    round.num_levels = 1 + num_bits(max_bucket_size - 1);

    // Fill in point data grouped in buckets
    let point_data = &mut round.point_data;
    for (idx, wnaf) in wnafs.iter().enumerate() {
        let bucket_idx = (wnaf & 0x7FFFFFFF) as usize;
        point_data[bucket_offsets[bucket_idx]] = (wnaf & 0x80000000) | (idx as u32);
        bucket_offsets[bucket_idx] += 1;
    }
}

/// Sorts the points so they are grouped per bucket
fn sort<C: CurveAffine>(wnafs: &mut [u32], rounds: &mut [RoundData], c: usize) {
    let num_rounds = get_num_rounds(c);
    let num_points = wnafs.len() / num_rounds;

    // Sort per bucket for each round separately
    let start = start_measure(format!("radix sort"), false);
    multicore::scope(|scope| {
        for (round, wnafs) in rounds.chunks_mut(1).zip(wnafs.chunks_mut(num_points)) {
            scope.spawn(move |_| {
                radix_sort(wnafs, &mut round[0]);
            });
        }
    });
    stop_measure(start);
}

/// Creates the addition tree.
/// When PREPROCESS is false we just calculate the size of each level.
/// All points in a bucket needs to be added to each other. Because the affine formulas
/// are used we need to add points together in pairs. So we have to make sure that
/// on each level we have an even number of points for each level. Odd points are
/// added on lower levels where the lenght of the addition results is odd (which then
/// makes the length even).
fn process_addition_tree<const PREPROCESS: bool>(round: &mut RoundData, c: usize) {
    let num_buckets = get_num_buckets(c);

    let num_levels = round.num_levels;
    let bucket_sizes = &round.bucket_sizes;
    let point_data = &round.point_data;

    let mut level_sizes = vec![0usize; num_levels];
    let mut level_offset = vec![0usize; num_levels];
    let output_indices = &mut round.output_indices;
    let scatter_map = &mut round.scatter_map;
    let point_locations = &mut round.point_locations;
    let mut point_idx = bucket_sizes[0];

    if !PREPROCESS {
        // Set the offsets to the different levels in the tree
        level_offset[0] = 0;
        for idx in 1..level_offset.len() {
            level_offset[idx] = level_offset[idx - 1] + round.level_sizes[idx - 1];
        }
    }

    let bucket_level = num_levels - 1;
    for b in 1..num_buckets {
        let mut length = bucket_sizes[b];
        if length == 0 {
            level_sizes[bucket_level] += 1;
        } else if length == 1 {
            if !PREPROCESS {
                scatter_map[round.scatter_map_len] = ScatterData {
                    position: (level_offset[bucket_level] + level_sizes[bucket_level]) as u32,
                    point_data: point_data[point_idx],
                };
                round.scatter_map_len += 1;
                point_idx += 1;
            }
            level_sizes[bucket_level] += 1;
        } else {
            let num_levels_bucket = 1 + num_bits(length - 1);
            let mut is_odd_point = false;
            let mut is_odd = false;
            let mut odd_position = 0usize;

            let mut sub_level_pos = level_sizes[0];
            for l in 0..num_levels_bucket - 1 {
                let level = l;
                let is_level_odd = length & 1;
                let first_level = l == 0;
                let last_level = l == num_levels_bucket - 2;

                // If this level has odd length we have to handle it
                if is_level_odd == 1 {
                    // If we already have a point saved from a previous odd level, use it
                    if is_odd {
                        if !PREPROCESS {
                            let pos = level_offset[level] + level_sizes[level];
                            if is_odd_point {
                                scatter_map[round.scatter_map_len] = ScatterData {
                                    position: pos as u32,
                                    point_data: point_data[odd_position],
                                };
                                round.scatter_map_len += 1;
                                is_odd_point = false;
                            } else {
                                output_indices[odd_position] = pos as u32;
                            }
                        }
                        level_sizes[level] += 1;
                        is_odd = false;
                        length += 1;
                    } else {
                        // Not odd yet, so that state is now odd
                        // Store the point we have to add later
                        if !PREPROCESS {
                            if first_level {
                                is_odd_point = true;
                                odd_position = point_idx + length - 1;
                            } else {
                                odd_position =
                                    (level_offset[level] + level_sizes[level] + length) >> 1;
                            }
                        }
                        is_odd = true;
                        length -= 1;
                    }
                }

                // Write initial points
                if first_level {
                    if !PREPROCESS {
                        // Just write all points (except the odd length one)
                        let pos = level_offset[level] + level_sizes[level];
                        point_locations[pos..pos + length]
                            .copy_from_slice(&point_data[point_idx..point_idx + length]);
                        point_idx += length + is_level_odd;
                    }
                    level_sizes[level] += length;
                }

                // Write output indices
                // If the next level is odd, we have to make it even
                // by writing the last result of this level to the next odd level
                let next_level_length = length >> 1;
                let next_level_odd = next_level_length & 1 == 1;
                let redirect = if next_level_odd && !is_odd && level < num_levels_bucket - 2 {
                    1usize
                } else {
                    0usize
                };
                let next_level_offset = level_offset[level] + (sub_level_pos >> 1);
                // Cache the start position of the next level
                sub_level_pos = level_sizes[level + 1];
                if !PREPROCESS {
                    // Write the output positions of the additions
                    let src_pos = level_offset[level + 1] + level_sizes[level + 1];
                    for (idx, output_index) in output_indices
                        [next_level_offset..next_level_offset + next_level_length]
                        .iter_mut()
                        .enumerate()
                    {
                        *output_index = (src_pos + idx) as u32;
                    }
                }
                if last_level {
                    // The result of the last addition for this bucket is written
                    // to the last level (so all bucket additions are nicely after each other).
                    if !PREPROCESS {
                        output_indices[next_level_offset] =
                            (level_offset[bucket_level] + level_sizes[bucket_level]) as u32;
                    }
                    level_sizes[bucket_level] += 1;
                } else {
                    level_sizes[level + 1] += next_level_length - redirect;
                    length -= redirect;
                    // We have to redirect a result to a lower level
                    if redirect == 1 {
                        odd_position = next_level_offset + next_level_length - 1;
                        is_odd = true;
                    }
                }

                // We haved added 2 points together so the next level has half the length
                length >>= 1;
            }
        }
    }

    round.level_sizes = level_sizes;
    round.level_offset = level_offset;
}

/// The affine formula is only efficient for independent point additions
/// (using the result of the addition requires an inversion which needs to be avoided as much as possible).
/// And so we try to add as many points together on each level of the tree, writing the result of the addition
/// to a lower level. Each level thus contains independent point additions, with only requiring a single inversion
/// per level in the tree.
fn create_addition_tree(rounds: &mut [RoundData], c: usize) {
    let start = start_measure(format!("create addition trees"), false);
    multicore::scope(|scope| {
        for round in rounds.chunks_mut(1) {
            scope.spawn(move |_| {
                // Collect tree levels sizes
                process_addition_tree::<true>(&mut round[0], c);
                // Construct the tree
                process_addition_tree::<false>(&mut round[0], c);
            });
        }
    });
    stop_measure(start);
}

/// Here we write the odd points in odd length buckets (the other points are loaded on the fly).
/// This will do random reads AND random writes, which is normally terrible for performance.
/// Luckily this doesn't really matter because we only have to write at most num_buckets points.
fn do_point_scatter<C: CurveAffine>(round: &RoundData, bases: &[C], points: &mut [C]) {
    let num_threads = multicore::current_num_threads();
    let scatter_map = &round.scatter_map[..round.scatter_map_len];
    let points_box = ThreadBox::from(points);
    let start = start_measure(format!("point scatter"), false);
    if scatter_map.len() > 0 {
        multicore::scope(|scope| {
            let num_copies_per_thread = (scatter_map.len() + num_threads - 1) / num_threads;
            for scatter_map in scatter_map.chunks(num_copies_per_thread) {
                scope.spawn(move |_| {
                    let points = points_box.unwrap();
                    for scatter_data in scatter_map.iter() {
                        let target_idx = scatter_data.position as usize;
                        let negate = scatter_data.point_data & 0x80000000 != 0;
                        let base_idx = (scatter_data.point_data & 0x7FFFFFFF) as usize;
                        if negate {
                            points[target_idx] = bases[base_idx].neg();
                        } else {
                            points[target_idx] = bases[base_idx];
                        }
                    }
                });
            }
        });
    }
    stop_measure(start);
}

/// Finally do all additions using the addition tree we've setup.
fn do_batch_additions<C: CurveAffine>(round: &RoundData, bases: &[C], points: &mut [C]) {
    let num_threads = multicore::current_num_threads();

    let num_levels = round.num_levels;
    let level_counter = &round.level_sizes;
    let level_offset = &round.level_offset;
    let output_indices = &round.output_indices;
    let point_locations = &round.point_locations;
    let points_box = ThreadBox::from(points);

    let start = start_measure(format!("batch additions"), false);
    for i in 0..num_levels - 1 {
        let start = level_offset[i];
        let num_points = level_counter[i];
        multicore::scope(|scope| {
            let num_points_per_thread = (((num_points / 2) + num_threads - 1) / num_threads) * 2;
            for thread_idx in 0..num_threads {
                scope.spawn(move |_| {
                    let points = points_box.unwrap();

                    let thread_start = thread_idx * num_points_per_thread;
                    let mut thread_num_points = num_points_per_thread;

                    if thread_start < num_points {
                        if thread_start + thread_num_points > num_points {
                            thread_num_points = num_points - thread_start;
                        }

                        let points = &mut points[(start + thread_start)..];
                        let output_indices = &output_indices[(start + thread_start / 2)..];
                        let offset = start + thread_start;
                        if i == 0 {
                            C::batch_add::<false, true>(
                                points,
                                output_indices,
                                thread_num_points,
                                offset,
                                &bases,
                                &point_locations[(start + thread_start)..],
                            );
                        } else {
                            C::batch_add::<false, false>(
                                points,
                                output_indices,
                                thread_num_points,
                                offset,
                                &bases,
                                &point_locations,
                            );
                        }
                    }
                });
            }
        });
    }
    stop_measure(start);
}

/// Accumulate all bucket results to get the result of the round
fn calculate_round_result<C: CurveAffine>(
    round: &RoundData,
    points: &mut [C],
    c: usize,
) -> C::Curve {
    let num_threads = multicore::current_num_threads();
    let num_buckets = get_num_buckets(c);

    let num_levels = round.num_levels;
    let bucket_sizes = &round.bucket_sizes;
    let level_offset = &round.level_offset;

    let start_time = start_measure(format!("add buckets together"), false);
    let start = level_offset[num_levels - 1];
    let buckets = &mut points[start..(start + num_buckets)];
    let mut results: Vec<C::Curve> = vec![C::Curve::identity(); num_threads];
    multicore::scope(|scope| {
        let chunk_size = num_buckets / num_threads;
        for (thread_idx, ((bucket_sizes, buckets), result)) in bucket_sizes[1..]
            .chunks(chunk_size)
            .zip(buckets[..].chunks_mut(chunk_size))
            .zip(results.chunks_mut(1))
            .enumerate()
        {
            scope.spawn(move |_| {
                // Accumulate all bucket results
                let num_buckets_thread = bucket_sizes.len();
                let mut acc = C::Curve::identity();
                let mut running_sum = C::Curve::identity();
                for b in (0..num_buckets_thread).rev() {
                    if bucket_sizes[b] > 0 {
                        running_sum = running_sum + buckets[b];
                    }
                    acc = acc + &running_sum;
                }

                // Each thread started at a different bucket location
                // so correct for that here
                let bucket_start = thread_idx * chunk_size;
                let num_bits = num_bits(bucket_start);
                let mut accumulator = C::Curve::identity();
                for idx in (0..num_bits).rev() {
                    accumulator = accumulator.double();
                    if (bucket_start >> idx) & 1 != 0 {
                        accumulator += running_sum;
                    }
                }
                acc += accumulator;

                result[0] = acc;
            });
        }
    });
    stop_measure(start_time);

    // Finally add the result of all threads together
    results
        .iter()
        .fold(C::Curve::identity(), |acc, result| acc + result)
}

use crate::{
    arithmetic::{best_multiexp, parallelize},
    env_value, start_measure, stop_measure,
};
#[cfg(test)]
use pairing::bn256::Fr as Fp;
use pairing::bn256::{self as bn256, Fq, G1Affine, G1};

#[cfg(test)]
fn get_random_data<const INDEPENDENT: bool>(n: usize) -> (Vec<G1Affine>, Vec<Fp>) {
    let mut bases = vec![pairing::bn256::G1Affine::identity(); n];
    parallelize(&mut bases, |bases, _| {
        let mut rng = rand::thread_rng();
        let base_rnd = pairing::bn256::G1Affine::random(&mut rng);
        for base in bases {
            if INDEPENDENT {
                *base = pairing::bn256::G1Affine::random(&mut rng);
            } else {
                *base = base_rnd;
            }
        }
    });

    let mut coeffs = vec![Fp::zero(); n];
    parallelize(&mut coeffs, |coeffs, _| {
        for coeff in coeffs {
            *coeff = Fp::rand();
        }
    });

    (bases, coeffs)
}

#[test]
fn test_multiexp_single() {
    let n = 1 << env_value("K", 15);

    let (bases, coeffs) = get_random_data::<true>(n);

    let res_base = best_multiexp(&coeffs, &bases);
    let res_base_affine: pairing::bn256::G1Affine = res_base.into();

    let mut ctx = MultiExp::new(&bases);
    let res = ctx.evaluate(&coeffs);
    let res_affine: pairing::bn256::G1Affine = res.into();

    assert_eq!(res_base_affine, res_affine);
}

#[test]
fn test_multiexp_bench() {
    let min_k = 10;
    let max_k = 20;
    let n = 1 << max_k;
    let (bases, coeffs) = get_random_data::<true>(n);
    let mut ctx = MultiExp::new(&bases);
    for k in min_k..=max_k {
        let n = 1 << k;
        let coeffs = &coeffs[..n];

        let start = start_measure("msm".to_string(), false);
        ctx.evaluate(&coeffs);
        let duration = stop_measure(start);

        println!("{}: {}ms", n, duration / 1000);
    }
}

#[test]
fn test_multiexp_best_c() {
    let max_k = 21;
    let n = 1 << max_k;

    let (bases, coeffs) = get_random_data::<true>(n);

    let mut ctx = MultiExp::new(&bases);
    for k in 4..=max_k {
        let n = 1 << k;
        let coeffs = &coeffs[..n];
        let bases = &bases[..n];

        let res_base = best_multiexp(coeffs, bases);
        let res_base_affine: pairing::bn256::G1Affine = res_base.into();

        let mut best_c = 0;
        let mut best_duration = usize::MAX;
        for c in 4..=21 {
            // Allocate memory so it doesn't impact performance
            ctx.allocate_for(n, c);

            let start = start_measure("measure performance".to_string(), false);
            let res = ctx.evaluate_with(&coeffs, c);
            let duration = stop_measure(start);

            if duration < best_duration {
                best_duration = duration;
                best_c = c;
            }

            let res_affine: pairing::bn256::G1Affine = res.into();
            assert_eq!(res_base_affine, res_affine);
        }
        println!("{}: {}", n, best_c);
    }
}

#[test]
fn test_endomorphism() {
    let rng = &mut rand::thread_rng();

    let scalar = Fp::rand();
    let point = bn256::G1Affine::random(rng);

    let expected = point * scalar;
    let (part1, part2) = bn256::G1Affine::get_endomorphism_scalars(&scalar);

    let k1 = Fp::from_u128(part1);
    let k2 = Fp::from_u128(part2);

    let t1 = point * k1;
    let base = bn256::G1Affine::get_endomorphism_base(&point);

    let t2 = base * k2;
    let result = t1 + t2;

    let res_affine: pairing::bn256::G1Affine = result.into();
    let exp_affine: pairing::bn256::G1Affine = expected.into();

    assert_eq!(res_affine, exp_affine);
}
