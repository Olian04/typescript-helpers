import { Maybe } from '../types/Maybe';

/**
 * Used to extract a value that might be undefined from an object that might be undefined, and if any of them are undefined use a fallback value.
 *
 * ```ts
 * import { someObject } from '...';
 * const fallback = {
 *    foo: 42,
 * };
 *
 * const foo = useValueOrFallback(someObject, 'foo', fallback.foo); // 42
 * ```
 *
 * @param obj The source object
 * @param key The key used to to extract the value
 * @param fallback The value to use if no valid value was found or the source object was undefined
 */
export const useValueOrFallback = <
  Target extends object,
  VirtualTarget extends Required<Target>,
  Key extends keyof Target,
  Fallback extends Target[Key]
>(
  obj: Maybe<Target>,
  key: Key,
  fallback: Fallback,
  treatAsFalsy?: (null | undefined | Fallback)[]
) => {
  if (obj === undefined) return fallback;
  if (obj === null) return fallback;
  if (!(key in obj)) return fallback;
  if (treatAsFalsy && treatAsFalsy.indexOf(obj[key] as any) > -1) {
    return fallback;
  }

  return obj[key] as VirtualTarget[Key];
};
