/**
 * A DataClass is a class with a auto generated constructor that takes a plain old javascript object with the same fields as the DataClass.
 *
 * ```ts
 * class MyDataClass extends DataClass<MyDataClass> {
 *   public question!: string;
 *   public answer!: number;
 * }
 * const myDataClass = new MyDataClass({
 *   question: 'The answer to life, the universe and everything',
 *   answer: 42,
 * });
 * myDataClass.answer // 42
 * ```
 */
export class DataClass<T extends DataClass<T>> {
  constructor(e: T) {
    Object.keys(e).forEach((k) => {
      // @ts-ignore
      this[k] = e[k];
    });
  }
}
