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
  Object.assign(pick(fallback, ...include), pick(obj, ...include)) as Flat<Pick<T, K>>;
