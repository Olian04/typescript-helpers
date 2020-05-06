type Func = (...args: any[]) => any;

/**
 * DeepPartial is used to apply the Partial type recursively to all applicable properties of an object.
 */
export type DeepPartial<T extends object> = {
  [P in keyof T]?: T[P] extends object ? (T[P] extends Func ? T[P] : DeepPartial<T[P]>) : T[P];
};