import { assertFilledString } from 'utils/assert-filled-string';
import { FilledString } from 'utils/filled-string';
import { Nominal } from 'utils/nominal';

export type FeedContent = Nominal<FilledString, 'FeedContent'>;

export function assertFeedContent(v: unknown): asserts v is FeedContent {
  assertFilledString(v, 'FeedContent');
}

export function asFeedContent(v: unknown): FeedContent {
  assertFeedContent(v);
  return v;
}
