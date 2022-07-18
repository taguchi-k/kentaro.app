import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Date from '../components/date';
import Layout, { siteTitle, baseUrl } from '../components/layout';
import { getOgImageUrl } from '../lib/og_image';
import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';
import { Post } from 'models/post';

type Props = { posts: readonly Pick<Post, 'id' | 'title' | 'dateString'>[] };

const image = getOgImageUrl({ title: `**${siteTitle}**`, fontSize: 125 });

export default function Home({ posts }: Props): JSX.Element {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <link rel="canonical" href={baseUrl} />

        <meta property="og:title" content={siteTitle} key="og:title" />
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:url" content={baseUrl} key="og:url" />
        <meta property="og:image" content={image} key="og:image" />

        <meta name="twitter:url" content={baseUrl} key="twitter:url" />
        <meta name="twitter:title" content={siteTitle} key="twitter:title" />
        <meta name="twitter:image" content={image} key="twitter:image" />
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Software Engineer: TypeScript, React, Node.js / Dart, Flutter / Swift,
          iOS
        </p>
        <p>
          You can contact me on{' '}
          <a href="https://twitter.com/kenkenken_3">Twitter</a>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ id, title, dateString }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={dateString} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props, never> = () => {
  const posts = getSortedPostsData().map(({ id, title, dateString }) => {
    return { id, title, dateString };
  });
  return { props: { posts } };
};
