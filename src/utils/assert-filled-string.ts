import { isString } from './assert-string';
import { FilledString } from './filled-string';
import { PreconditionError } from './precondition-error';

function isFilledString(v: unknown): v is string {
  return isString(v) && v !== '';
}

export function assertFilledString(
  v: unknown,
  target = ''
): asserts v is FilledString {
  if (!isFilledString(v)) {
    throw new PreconditionError(`${target} should be not empty string`.trim());
  }
}

export function asFilledString(v: unknown, target = ''): FilledString {
  assertFilledString(v, target);
  return v;
}
