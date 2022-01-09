/**
 * A Record is a class with a auto generated constructor that takes a plain old javascript object with the same fields as the Record.
 *
 * ```ts
 * class MyRecord extends Record<MyRecord> {
 *   public question!: string;
 *   public answer!: number;
 * }
 * const myRecord = new MyRecord({
 *   question: 'The answer to life, the universe and everything',
 *   answer: 42,
 * });
 * myRecord.answer // === 42
 * ```
 */
export class Record<T extends Record<T>> {
  constructor(e: T) {
    Object.keys(e).forEach((k) => {
      // @ts-ignore
      this[k] = e[k];
    });
  }
}
