import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Image from "next/image";

export const siteTitle = "kentaro.app";
const name = "kentaro";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}): JSX.Element {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.icon" />
        <meta property="description" content="website of kentaro" />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              src="/images/kentaro.png"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
              height="200"
              width="200"
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  src="/images/kentaro.png"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name}
                  height="100"
                  width="100"
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
