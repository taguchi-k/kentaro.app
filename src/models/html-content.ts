import { assertFilledString } from 'utils/assert-filled-string';
import { FilledString } from 'utils/filled-string';
import { Nominal } from 'utils/nominal';

export type HtmlContent = Nominal<FilledString, 'HtmlContent'>;

export function assertHtmlContent(v: unknown): asserts v is HtmlContent {
  assertFilledString(v, 'HtmlContent');
}

export function asHtmlContent(v: unknown): HtmlContent {
  assertHtmlContent(v);
  return v;
}
