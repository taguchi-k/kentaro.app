import { FeedContent } from './feed-content';
import { HtmlContent } from './html-content';
import { PostId } from './post-id';
import { FilledString } from 'utils/filled-string';

export type Post = {
  readonly id: PostId;
  readonly title: FilledString;
  readonly dateString: FilledString;
  readonly content: HtmlContent | FeedContent;
};
