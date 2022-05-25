import { describe, it } from 'mocha';
import { expect } from 'chai';

import { pick } from './pick';

describe('pick', () => {
  it('should extract correct value and type for ONE key', ()  => {
    const original = {
      foo: 42
    };
    const result = pick(original, 'foo');
    expect(result.foo).to.equal(original.foo);
    expect(typeof result.foo).to.equal(typeof original.foo);
  });

  it('should extract correct values and types for MULTIPLE keys', ()  => {
    const original = {
      foo: 42,
      bar: 'biz',
      boz: () => {/* --- */},
    };
    const result = pick(original, 'foo', 'boz');
    expect(result.foo).to.equal(original.foo);
    expect(typeof result.foo).to.equal(typeof original.foo);
    expect(result.boz).to.equal(original.boz);
    expect(typeof result.boz).to.equal(typeof original.boz);
  });
});

