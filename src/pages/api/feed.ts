import { NextApiRequest, NextApiResponse } from 'next';

import { generateFeedXml } from '../../utils/generate-feed-xml';

export default async function feed(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const xml = await generateFeedXml();

  res.statusCode = 200;
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // 24時間キャッシュする
  res.setHeader('Content-Type', 'application/rss+xml;charset=utf-8');
  res.write(xml);
  res.end();
}
