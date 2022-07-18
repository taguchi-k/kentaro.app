import { assertFilledString } from 'utils/assert-filled-string';
import { FilledString } from 'utils/filled-string';
import { Nominal } from 'utils/nominal';

export type PostId = Nominal<FilledString, 'PostId'>;

export function assertPostId(v: unknown): asserts v is PostId {
  assertFilledString(v, 'PostId');
}

export function asPostId(v: unknown): PostId {
  assertPostId(v);
  return v;
}
