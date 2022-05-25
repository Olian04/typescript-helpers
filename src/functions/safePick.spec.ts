import { describe, it } from 'mocha';
import { expect } from 'chai';

import { safePick } from './safePick';

describe('safePick', () => {
  it('should use correct value and type for ONE present key', ()  => {
    const fallback = {
      foo: 42,
      bar: 'biz',
      boz: () => {},
    };
    const original = {
      foo: 3
    };
    const result = safePick(original, fallback, 'foo');
    expect(result.foo).to.equal(original.foo);
    expect(typeof result.foo).to.equal(typeof original.foo);
  });

  it('should use fallback value and type for ONE missing key', ()  => {
    const fallback = {
      foo: 42,
      bar: 'biz',
      boz: () => {},
    };
    const original = {};
    const result = safePick(original, fallback, 'foo');
    expect(result.foo).to.equal(fallback.foo);
    expect(typeof result.foo).to.equal(typeof fallback.foo);
  });

  it('should use correct values and types for MULTIPLE present keys', ()  => {
    const fallback = {
      foo: 42,
      bar: 'biz',
      boz: () => {},
    };
    const original = {
      foo: 3,
      boz: () => {},
    };
    const result = safePick(original, fallback, 'foo', 'boz');
    expect(result.foo).to.equal(original.foo);
    expect(typeof result.foo).to.equal(typeof original.foo);
    expect(result.boz).to.equal(original.boz);
    expect(typeof result.boz).to.equal(typeof original.boz);
  });

  it('should use fallback values and types for MULTIPLE missing keys', ()  => {
    const fallback = {
      foo: 42,
      bar: 'biz',
      boz: () => {},
    };
    const original = {};
    const result = safePick(original, fallback, 'foo', 'boz');
    expect(result.foo).to.equal(fallback.foo);
    expect(typeof result.foo).to.equal(typeof fallback.foo);
    expect(result.boz).to.equal(fallback.boz);
    expect(typeof result.boz).to.equal(typeof fallback.boz);
  });
});

