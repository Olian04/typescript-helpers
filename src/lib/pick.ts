import { ExpandType } from "./ExpandType";

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
) as ExpandType<Pick<T, K>>;

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
  Object.assign(pick(fallback, ...include), pick(obj, ...include)) as ExpandType<Pick<T, K>>;
