import { assertFilledString } from 'utils/assert-filled-string';
import { PreconditionError } from 'utils/precondition-error';

const contentTypes = ['html', 'feed'] as const;
export type ContentType = typeof contentTypes[number];

export function assertContentType(v: unknown): asserts v is ContentType {
  assertFilledString(v);
  if (!contentTypes.includes(v as ContentType)) {
    throw new PreconditionError('value should be content type');
  }
}

export function asDiscountType(v: unknown): ContentType {
  assertContentType(v);
  return v;
}
