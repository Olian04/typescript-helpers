// Inspiration: https://stackoverflow.com/questions/57683303/how-can-i-see-the-full-expanded-contract-of-a-typescript-type/57683652#57683652

import { Func } from './Func';

/**
 * Flattens a type, so that it isn't defined by type-aliases.
 *
 * ```ts
 * import { IPalette } from '....';
 * type A = IPalette<{
 *    primary: "#3344dd";
 *    secondary: "#55ddff";
 * }, {
 *     light: string;
 *     dark: string;
 * }>;
 * type B = Flat<A> /* {
 *   primary: {
 *     light: string;
 *     dark: string;
 *   };
 *   secondary: {
 *     light: string;
 *     dark: string;
 *   };
 * };
 * ```
 */
export type Flat<T> = T extends object
  ? T extends infer O ? {
    [K in keyof O]: O[K] extends Func ? O[K] : Flat<O[K]>
  } : never
  : T;
