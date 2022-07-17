import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang='ko'>
        <Head>
          <link
            href='//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css'
            rel='stylesheet'
            type='text/css'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
