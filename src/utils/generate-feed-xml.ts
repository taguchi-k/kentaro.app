import RSS from 'rss';

import { siteTitle } from 'components/layout';
import { getPostData, getSortedPostsData } from 'lib/posts';

export async function generateFeedXml(): Promise<string> {
  const HOST_NAME = process.env.NEXT_PUBLIC_HOST_NAME;

  if (!HOST_NAME) {
    throw new Error("host name couldn't resolved.");
  }

  const feed = new RSS({
    title: siteTitle,
    site_url: HOST_NAME,
    feed_url: `${HOST_NAME}/feed.xml`,
  });

  const postsData = await Promise.all(
    getSortedPostsData().map(async (post) => {
      const processedContent = await getPostData(post.id);
      return processedContent;
    })
  );

  postsData.map((post) => {
    feed.item({
      title: post.title,
      description: post.contentHtml,
      guid: post.id,
      url: `${HOST_NAME ?? ''}/posts/${post.id}`,
      date: post.date,
      author: 'kentaro',
    });
  });

  // XML形式の文字列にする
  return feed.xml();
}
