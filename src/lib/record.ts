export class Record<T extends Record<T>> {
  constructor(e: T) {
    Object.keys(e).forEach((k) => {
      // @ts-ignore
      this[k] = e[k];
    });
  }
}