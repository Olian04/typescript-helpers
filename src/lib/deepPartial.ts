type Func = (...args: any[]) => any;
export type DeepPartial<T extends object> = {
  [P in keyof T]?: T[P] extends object ? (T[P] extends Func ? T[P] : DeepPartial<T[P]>) : T[P];
};