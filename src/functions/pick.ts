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
export const pick = <T extends object, K extends keyof T>(obj: T, ...include: K[]) =>
  include.reduce((res, k) => {
    res[k] = obj[k];
    return res;
  }, {} as any) as Flat<Pick<T, K>>;
