import Layout from "../../components/layout";
import { getAllPostsIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import markdownStyles from "../../styles/markdown-styles.module.css";

const maxResized = 1680;

const renderers = {
  image: (image: { src?: string; alt?: string }): JSX.Element => {
    const imageSrc = image.src === undefined ? "" : image.src;
    const imageAlt = image.alt === undefined ? "" : image.alt;
    const img = (
      <Image
        src={imageSrc}
        alt={imageAlt}
        height={maxResized}
        width={maxResized}
      />
    );
    return img;
  },
  paragraph: (paragraph: {
    node: { children: { type: "image" | string }[] };
    children: string;
  }): JSX.Element => {
    const { node } = paragraph;

    if (node.children[0].type === "image") {
      const image = node.children[0] as { src?: string; alt?: string };
      const imageSrc = image.src === undefined ? "" : image.src;
      const imageAlt = image.alt === undefined ? "" : image.alt;
      return (
        <Image
          src={imageSrc}
          alt={imageAlt}
          height={maxResized}
          width={maxResized}
        />
      );
    }

    const p = <p>{paragraph.children}</p>;
    return p;
  },
};

export default function Post({
  postData,
}: {
  postData: {
    id: string;
    title: string;
    date: string;
    contents: string;
  };
}): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div>
          <ReactMarkdown
            className={markdownStyles["markdown"]}
            // renderers={renderers}
            source={postData.contents}
          />
        </div>
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
  const postData = getPostData(id);
  return Promise.resolve({
    props: {
      postData,
    },
  });
};
