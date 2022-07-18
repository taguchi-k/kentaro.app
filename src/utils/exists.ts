import { PreconditionError } from './precondition-error';

export function exists<T>(v: T | null | undefined): v is T {
  return typeof v !== 'undefined' && v !== null;
}

export function assertExists<T>(
  v: T | null | undefined,
  target = ''
): asserts v is NonNullable<T> {
  if (!exists(v)) {
    throw new PreconditionError(`${target} should be specified`.trim());
  }
}
