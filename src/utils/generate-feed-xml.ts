import RSS from 'rss';

import { exists } from './exists';
import { siteTitle } from 'components/layout';
import { getSortedPostsData } from 'lib/posts';

export function generateFeedXml(): string {
  const HOST_NAME = process.env.NEXT_PUBLIC_HOST_NAME;

  if (!exists(HOST_NAME)) {
    throw new Error("host name couldn't resolved.");
  }

  const feed = new RSS({
    title: siteTitle,
    site_url: HOST_NAME,
    feed_url: `${HOST_NAME}/feed.xml`,
  });

  const postsData = getSortedPostsData();

  postsData.map((post) => {
    feed.item({
      title: post.title,
      description: post.content,
      guid: post.id,
      url: `${HOST_NAME ?? ''}/posts/${post.id}`,
      date: post.dateString,
      author: 'kentaro',
    });
  });

  // XML形式の文字列にする
  return feed.xml();
}
