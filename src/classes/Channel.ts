import { Bucket } from './Bucket';

/**
 * A Channel allows for message passing between two or more asynchronous function with the option of being notified when a sent message is received.
 *
 * ```ts
 * const channel = new Channel<number>();
 *
 * const sender = async (i = 0): Promise<void> => {
 *   await channel.send(i);
 *   return sender(i + 1);
 * }
 *
 * sender();
 * await channel.receive(); // 0
 * await channel.receive(); // 1
 * await channel.receive(); // 2
 * await channel.receive(); // 3
 * ```
 */
export class Channel<T> {
  private awaitReceiveMap = new WeakMap<{ value: T }, () => void>();
  private bucket = new Bucket< { value: T }>();

  async send(value: T) {
    const wrapper = { value };

    const receivePromise = new Promise<void>((resolve) => {
      this.awaitReceiveMap.set(wrapper, () => resolve());
    });
    this.bucket.push(wrapper);

    return receivePromise;
  }

  async receive() {
    const { value: wrapper } = await this.bucket.next();

    const receiveCallback = this.awaitReceiveMap.get(wrapper);
    if (receiveCallback) {
      receiveCallback();
      this.awaitReceiveMap.delete(wrapper);
    }

    return wrapper.value;
  }

  get generator() {
    return this.getGenerator();
  }

  private async *getGenerator() {
    for await (const wrapper of this.bucket) {
      const receiveCallback = this.awaitReceiveMap.get(wrapper);
      if (receiveCallback) {
        receiveCallback();
        this.awaitReceiveMap.delete(wrapper);
      }

      yield wrapper.value;
    }
  }
}
