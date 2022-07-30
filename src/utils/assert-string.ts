import { PreconditionError } from './precondition-error';

export function isString(v: unknown): v is string {
  return typeof v === 'string';
}

export function assertString(v: unknown, target = ''): asserts v is string {
  if (!isString(v)) {
    throw new PreconditionError(`${target} should be string`.trim());
  }
}

export function asString(v: unknown): string {
  assertString(v);
  return v;
}
