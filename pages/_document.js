import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="stylesheet" href="https://ui.contentstack.com/contentstack.min.css" />
                <script src="https://ui.contentstack.com/bootstrap.min.js" crossOrigin="anonymous"></script>
                <script src="https://ui.contentstack.com/contentstack.min.js"></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
