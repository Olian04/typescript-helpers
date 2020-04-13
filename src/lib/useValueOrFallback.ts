import { Maybe } from './maybe';

export const useValueOrFallback = <
  Target extends object,
  VirtualTarget extends Required<Target>,
  Key extends keyof Target,
  Fallback extends Target[Key],
  >(obj: Maybe<Target>, key: Key, fallback: Fallback) =>
    ((obj !== undefined && key in obj) ? obj[key] : fallback) as VirtualTarget[Key];