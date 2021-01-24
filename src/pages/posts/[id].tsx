import Layout, { baseUrl } from "../../components/layout";
import { getAllPostsIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";

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
  const url = `${baseUrl}${postData.id}`;
  const image = `https://og-image-lake-nine.vercel.app/${encodeURI(
    postData.title
  )}.png?md=0&fontSize=75px`;

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <link rel="canonical" href={url} />

        <meta property="og:title" content={postData.title} key="og:title" />
        <meta property="og:type" content="article" key="og:type" />
        <meta property="og:url" content={url} key="og:url" />
        <meta property="og:image" content={image} key="og:image" />

        <meta name="twitter:url" content={image} key="twitter:url" />
        <meta
          name="twitter:title"
          content={postData.title}
          key="twitter:title"
        />
        <meta name="twitter:image" content={image} key="twitter:image" />
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
