import { Flat } from '../types/Flat';

/**
 * Create subsets of objects in a type-safe way
 *
 * ```ts
 * const target = {
 *    a: 1,
 *    b: 'A',
 *    c: [1, 2, 3],
 * };
 *
 * const bar = pick(target, 'a', 'c');
 * typeof bar /* {
 *    a: number;
 *    c: number[];
 * }
 * ```
 */
export const pick = <T extends object, K extends keyof T>(obj: T, ...include: K[]) => Object.fromEntries(
  Object.entries(obj).filter(([k]) => include.indexOf(k as K) > -1)
) as Flat<Pick<T, K>>;
