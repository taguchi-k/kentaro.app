import {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import Date from '../../components/date';
import Layout, { baseUrl } from '../../components/layout';
import { getOgImageUrl } from '../../lib/og_image';
import { getAllPostsIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

type Props = {
  postData: {
    id: string;
    title: string;
    date: string;
    contentHtml: string;
  };
};

export default function Post(props: Props): JSX.Element {
  const { id, title, date, contentHtml } = props.postData;
  const url = `${baseUrl}/posts/${id}`;
  const image = getOgImageUrl({ title: `**${title}**`, fontSize: 100 });

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <link rel="canonical" href={url} />
        <meta property="description" content={contentHtml} />

        <meta property="og:title" content={title} key="og:title" />
        <meta property="og:type" content="article" key="og:type" />
        <meta property="og:url" content={url} key="og:url" />
        <meta property="og:image" content={image} key="og:image" />
        <meta
          property="og:description"
          content={contentHtml}
          key="og:description"
        />

        <meta name="twitter:url" content={image} key="twitter:url" />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta name="twitter:image" content={image} key="twitter:image" />
        <meta
          name="twitter:description"
          content={contentHtml}
          key="twitter:description"
        />
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostsIds();
  return Promise.resolve({
    paths,
    fallback: false,
  });
}

type Params = ParsedUrlQuery & {
  id: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const postData = await getPostData(params?.id ?? '');
  return {
    props: {
      postData,
    },
  };
};
