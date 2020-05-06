import { Bucket } from './src/api';

const bucket = new Bucket<number>();

async function* foo() {
  yield *bucket;
}

setInterval(() => {
  bucket.push(Date.now());
}, 1000);

(async () => {
  for await (const value of foo()) {
    console.log(value);
  }
})();