import { Func } from './Func';

/**
 * DeepPartial is used to apply the Partial type recursively to all applicable properties of an object.
 *
 * ```ts
 * type A = {
 *   foo: {
 *     bar: number;
 *   };
 * };
 * type B =  DeepPartial<A> /* {
 *   foo?: {
 *     bar?: number;
 *   };
 * }
 * ```
 */
export type DeepPartial<T extends object> = {
  [P in keyof T]?: T[P] extends object ? (T[P] extends Func ? T[P] : DeepPartial<T[P]>) : T[P];
};
