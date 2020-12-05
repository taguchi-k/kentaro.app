import Docment, { Head, Main, NextScript } from "next/document";
import { existsGAID, GA_ID } from "../lib/gtag";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <html lang="ja">
        <Head>
          {/* Google Analytics */}
          {existsGAID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_ID}', {
                      page_path: window.location.pathname,
                    });`,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
