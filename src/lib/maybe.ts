/**
 * Used simply to improve readability of code.
 *
 * ```ts
 * type A =  string;
 * type B =  Maybe<A> /* === A | undefined *\/
 * ```
 */
export type Maybe<T> = T | undefined;
