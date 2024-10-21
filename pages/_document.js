import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="stylesheet" href="https://ui.contentstack.com/contentstack.min.css" />
            </Head>
            <body>
                <Main />
                <NextScript />

                <Script
                    src="https://ui.contentstack.com/bootstrap.min.js"
                    crossOrigin="anonymous"
                    strategy="lazyOnload"
                />
                <Script
                    src="https://ui.contentstack.com/contentstack.min.js"
                    strategy="lazyOnload"
                />
            </body>
        </Html>
    );
}
