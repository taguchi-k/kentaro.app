import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home(): JSX.Element {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Software Engineer: Swift / iOS / SwiftUI / Combine </p>
        <p>
          You can contact me on{" "}
          <a href="https://twitter.com/kenkenken_3">Twitter</a>
        </p>
      </section>
    </Layout>
  );
}
