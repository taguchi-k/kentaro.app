import { NextApiRequest, NextApiResponse } from 'next';

import { generateFeedXml } from '../../utils/generate-feed-xml';

export default function feed(req: NextApiRequest, res: NextApiResponse): void {
  const xml = generateFeedXml();

  res.statusCode = 200;
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.setHeader('Content-Type', 'application/rss+xml;charset=utf-8');
  res.write(xml);
  res.end();
}
