import fs from 'fs';
import RSS from 'rss';
import { siteTitle } from '../src/components/layout';
import { getSortedPostsData, getPostData } from '../src/lib/posts';

const HOST_NAME = process.env.NEXT_PUBLIC_HOST_NAME;

if (!HOST_NAME) {
  throw new Error("host name couldn't resolved.");
}

async function generate(): Promise<void> {
  const feed = new RSS({
    title: siteTitle,
    site_url: HOST_NAME ?? '',
    feed_url: `${HOST_NAME ?? ''}/feed.xml`,
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

  const rss = feed.xml({ indent: true });
  fs.writeFileSync('./.next/static/feed.xml', rss);
}

void generate();
