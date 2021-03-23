import { describe, it } from 'mocha';
import { expect } from 'chai';

import { useValueOrFallback } from './useValueOrFallback';

describe('useValueOrFallback', () => {
  const data = ({
    isValid: 1,
    isUndefined: undefined,
  } as any) as {
    isValid: number;
    isInvalid: number;
    isUndefined: number;
  };

  it('should use VALUE for present keys', () => {
    expect(useValueOrFallback(data, 'isValid', 42)).to.equal(data.isValid);
  });

  it('should use FALLBACK for none-present keys', () => {
    expect(useValueOrFallback(data, 'isInvalid', 42)).to.equal(42);
  });

  it('should use VALUE for valid values, when empty treatAsFalsy array is provided', () => {
    expect(useValueOrFallback(data, 'isValid', 42, [])).to.equal(data.isValid);

    expect(useValueOrFallback(data, 'isUndefined', 42, [])).to.equal(
      data.isUndefined
    );
  });

  it('should use VALUE for valid values, when treatAsFalsy array is provided', () => {
    expect(useValueOrFallback(data, 'isValid', 42, [undefined])).to.equal(
      data.isValid
    );
    expect(useValueOrFallback(data, 'isValid', 42, [null])).to.equal(
      data.isValid
    );
    expect(
      useValueOrFallback(data, 'isValid', 42, [/* some random number */ 13])
    ).to.equal(data.isValid);

    expect(useValueOrFallback(data, 'isUndefined', 42, [null])).to.equal(
      data.isUndefined
    );
    expect(
      useValueOrFallback(data, 'isUndefined', 42, [/* some random number */ 13])
    ).to.equal(data.isUndefined);
  });

  it('should use FALLBACK for values present in treatAsFalsy array when provided', () => {
    expect(useValueOrFallback(data, 'isValid', 42, [data.isValid])).to.equal(
      42
    );
    expect(
      useValueOrFallback(data, 'isUndefined', 42, [data.isUndefined])
    ).to.equal(42);
  });
});
