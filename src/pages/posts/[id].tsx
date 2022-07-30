import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import Date from '../../components/date';
import Layout, { baseUrl } from '../../components/layout';
import { getOgImageUrl } from '../../lib/og_image';
import { getAllPostsIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';
import { Post } from 'models/post';
import { asPostId } from 'models/post-id';

type Props = { post: Post };

export default function PostPage({
  post: { id, title, dateString, content },
}: Props): JSX.Element {
  const url = `${baseUrl}/posts/${id}`;
  const image = getOgImageUrl({ title: `**${title}**`, fontSize: 100 });

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <link rel="canonical" href={url} />
        <meta property="description" content={content} />

        <meta property="og:title" content={title} key="og:title" />
        <meta property="og:type" content="article" key="og:type" />
        <meta property="og:url" content={url} key="og:url" />
        <meta property="og:image" content={image} key="og:image" />
        <meta
          property="og:description"
          content={content}
          key="og:description"
        />

        <meta name="twitter:url" content={image} key="twitter:url" />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta name="twitter:image" content={image} key="twitter:image" />
        <meta
          name="twitter:description"
          content={content}
          key="twitter:description"
        />
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={dateString} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostsIds();
  return Promise.resolve({
    paths,
    fallback: false,
  });
};

type Params = ParsedUrlQuery & {
  id: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const post = await getPostData(asPostId(params?.id));
  return { props: { post } };
};
