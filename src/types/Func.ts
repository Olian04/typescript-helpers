/**
 * Used to improve readability of code.
 * Matches any function signature.
 *
 * ```ts
 * const foo = <F extends Func>(f: F) => f;
 *
 * const a = foo(() => 1);
 * typeof a // () => number
 * const b = foo((a: number) => a);
 * typeof b // (a: number) => number
 * const c = foo((s: string) => [1,2].join(s));
 * typeof c // (s: string) => string
 * const d = foo((a: number, b: number) => a*b);
 * typeof d // (a: number, b: number) => number
 * ```
 */
export type Func = (...args: any[]) => any;
