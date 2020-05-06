// Inspired by: https://stackoverflow.com/a/60962966/6224823

export interface IBucket<T> extends AsyncGenerator<T, never, unknown> {
  push(v: T): void;
}

/**
 * A bucket is used to convert any asynchronously occurring event into an async generator.
 *
 * (async () => {
 *   const bucket = new Bucket<number>();
 *
 *   setInterval(() => {
 *     bucket.push(Date.now());
 *   }, 1000);
 *
 *   for await (const timeStamp of bucket) {
 *     console.log(timeStamp);
 *   }
 * })();
 */
export class Bucket<T> implements IBucket<T> {
  private stack: T[];
  private nextValue: ((v: T) => void) | null;
  private iterator: IBucket<T>;
  constructor() {
    this.stack = [];
    this.nextValue = null;

    const self = this;

    async function * bucket() {
      while (true) {
        yield new Promise((resolve: (v: T | undefined) => void) => {
          if (self.stack.length > 0) {
            return resolve(self.stack.shift());
          }
          self.nextValue = resolve;
        });
      }
    }

    this.iterator = bucket() as IBucket<T>;
  }

  push(value: T) {
    if (this.nextValue) {
      this.nextValue(value);
      this.nextValue = null;
      return;
    }

    this.stack.push(value);
  }
  [Symbol.iterator]() {
    // Typescript freaks out if this isn't here....
    // Even though Symbol.asyncIterator is present
    // and even though Symbol.iterator returns an async iterator
    return this;
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  next() {
    return this.iterator.next();
  }
  return(value: PromiseLike<never>) {
    return this.iterator.return(value);
  }
  throw(e: any) {
    return this.iterator.throw(e);
  }
}
