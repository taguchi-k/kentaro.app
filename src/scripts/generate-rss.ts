import fs from "fs";
import RSS from "rss";
import { getSortedPostsData } from "../lib/posts";
import { siteTitle } from "../components/layout";

const HOST_NAME = process.env.NEXT_PUBLIC_HOST_NAME;

if (!HOST_NAME) {
  throw new Error("host name couldn't resolved.");
}

const generate = (): void => {
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
      url: `${HOST_NAME}/posts/${post.id}`,
      date: post.date,
      author: "kentaro",
    });
  });

  const rss = feed.xml({ indent: true });
  fs.writeFileSync("./.next/static/feed.xml", rss);
};

generate();
