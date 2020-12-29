import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { initGA, logPageView } from "../lib/analytics";

import "../styles/globals.css";
import "highlight.js/styles/github.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    initGA();
    // `routeChangeComplete` won't run for the first page load unless the query string is
    // hydrated later on, so here we log a page view if this is the first render and
    // there's no query string
    if (!router.asPath.includes("?")) {
      logPageView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Listen for page changes after a navigation or when the query changes
    router.events.on("routeChangeComplete", logPageView);
    return (): void => {
      router.events.off("routeChangeComplete", logPageView);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
