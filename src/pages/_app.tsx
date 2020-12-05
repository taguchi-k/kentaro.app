import "../styles/globals.css";
import "highlight.js/styles/github.css";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import { AppProps } from "next/app";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    if (!gtag.existsGAID) {
      return;
    }

    const handleRouteChange = (path: string): void => {
      gtag.pageview(path);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return (): void => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
