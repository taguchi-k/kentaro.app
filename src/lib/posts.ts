import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { asFeedContent } from 'models/feed-content';
import { asHtmlContent } from 'models/html-content';
import { Post } from 'models/post';
import { asPostId, PostId } from 'models/post-id';
import { asFilledString } from 'utils/assert-filled-string';

const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * @TODO 別ファイル切り出し
 * @TODO テスト追加
 */
export function getSortedPostsData(): readonly Post[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  // @TODO: create adaput function
  const allPostsData: readonly Post[] = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const content = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(content);

    const resultData = matterResult.data as { date: string; title: string };

    // Combine the data with the id
    return {
      id: asPostId(id),
      title: asFilledString(resultData.title),
      dateString: asFilledString(resultData.date),
      content: asFeedContent(content),
    };
  });

  // @TODO: 別関数に切り出し
  // @TODO: テスト追加
  // Sort posts by date
  return [...allPostsData].sort((a, b) => {
    if (a.dateString < b.dateString) {
      return 1;
    }
    return -1;
  });
}

/**
 * @TODO 別ファイル切り出し
 * @TODO テスト追加
 */
export function getAllPostsIds(): {
  params: {
    id: string;
  };
}[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return { params: { id: fileName.replace(/\.md$/, '') } };
  });
}

/**
 * @TODO 別ファイル切り出し
 * @TODO テスト追加
 */
export async function getPostData(id: PostId): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const resultData = matterResult.data as { date: string; title: string };

  // @TODO: create adaput function
  // Combine the data with the id and contentHtml
  return {
    id,
    title: asFilledString(resultData.title),
    dateString: asFilledString(resultData.date),
    content: asHtmlContent(contentHtml),
  };
}
