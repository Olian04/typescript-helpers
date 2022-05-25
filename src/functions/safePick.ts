import { Flat } from '../types/Flat';
import { pick } from './pick';

/**
 * Create subsets of objects in a value-safe & type-safe way
 *
 * ```ts
 * import { someObject } from '...';
 * const fallback = {
 *    a: 1,
 *    b: 'A',
 *    c: [1, 2, 3],
 * };
 * const bar = safePick(someObject, fallback, 'a', 'c');
 * typeof bar /* === {
 *    a: number;
 *    c: number[];
 * }
 * ```
 */
export const safePick = <T extends object, K extends keyof T>(obj: Partial<T>, fallback: T, ...include: K[]) =>
  include.reduce((res, k) => {
    res[k] = k in obj ? obj[k] : fallback[k];
    return res;
  }, {} as any) as Flat<Pick<T, K>>;
