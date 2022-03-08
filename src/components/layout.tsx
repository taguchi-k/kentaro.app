import Head from 'next/head';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';
import styles from './layout.module.css';

export const siteTitle = 'kentaro.app';
export const baseUrl = 'https://kentaro.app/';

const name = 'kentaro';
const description = "Kentaro's website";
const rssTitle = `RSS Feed for ${siteTitle}`;

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
        <meta property="description" content={description} />
        <meta name="author" content={name}></meta>

        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href={'/favicon.ico'} />
        <link rel="apple-touch-icon" href={'/apple-touch-icon.png'} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={rssTitle}
          href="/feed.xml"
        />

        <meta property="og:site_name" content={siteTitle} key="og:site_name" />
        <meta
          property="og:description"
          content={description}
          key="og:description"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitter:card"
        />
        <meta name="twitter:site" content="@kenkenken_3" key="twitter:site" />
        <meta
          name="twitter:description"
          content={description}
          key="twitter:description"
        />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/kentaro.webp"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/kentaro.webp"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name}
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
