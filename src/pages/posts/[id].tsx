import Layout, { baseUrl } from "../../components/layout";
import { getAllPostsIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";
import { getOgImageUrl } from "../../lib/og_image";

export default function Post({
  postData,
}: {
  postData: {
    id: string;
    title: string;
    date: string;
    contentHtml: string;
  };
}): JSX.Element {
  const url = `${baseUrl}/posts/${postData.id}`;
  const image = getOgImageUrl({ title: postData.title, fontSize: 100 });

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <link rel="canonical" href={url} />
        <meta property="description" content={postData.contentHtml} />

        <meta property="og:title" content={postData.title} key="og:title" />
        <meta property="og:type" content="article" key="og:type" />
        <meta property="og:url" content={url} key="og:url" />
        <meta property="og:image" content={image} key="og:image" />
        <meta
          property="og:description"
          content={postData.contentHtml}
          key="og:description"
        />

        <meta name="twitter:url" content={image} key="twitter:url" />
        <meta
          name="twitter:title"
          content={postData.title}
          key="twitter:title"
        />
        <meta name="twitter:image" content={image} key="twitter:image" />
        <meta
          name="twitter:description"
          content={postData.contentHtml}
          key="twitter:description"
        />
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params === undefined ? "" : (params.id as string);
  const postData = await getPostData(id);
  return {
    props: {
      postData,
    },
  };
};
