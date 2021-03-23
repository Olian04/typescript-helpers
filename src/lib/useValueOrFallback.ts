import { Maybe } from './maybe';

/**
 * Used to extract a value that might be undefined from an object that might be undefined, and if any of them are undefined use a fallback value.
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
