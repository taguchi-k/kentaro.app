import { assertFilledString } from './assert-filled-string';
import { serialize } from './serialize';

describe('assertFilledString()', () => {
  describe('true となるもの', () => {
    ['a'].forEach((v) => {
      test(serialize(v), () => {
        expect(() => assertFilledString(v, '')).not.toThrow();
      });
    });
  });

  describe('false となるもの', () => {
    [
      '',
      [],
      {},
      1,
      BigInt(1),
      null,
      undefined,
      true,
      false,
      Symbol('symbol'),
      /* eslint-disable-next-line @typescript-eslint/no-empty-function */
      (): void => {},
    ].forEach((v) => {
      test(serialize(v), () => {
        expect(() => assertFilledString(v, '')).toThrow();
      });
    });
  });
});
