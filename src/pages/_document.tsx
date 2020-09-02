import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
        {/* <!-- The core Firebase JS SDK is always required and must be listed first --> */}
        <script src="/__/firebase/7.19.1/firebase-app.js"></script>

        {/* <!-- TODO: Add SDKs for Firebase products that you want to use
            https://firebase.google.com/docs/web/setup#available-libraries --> */}
        <script src="/__/firebase/7.19.1/firebase.js"></script>

        {/* <!-- Initialize Firebase --> */}
        <script src="/__/firebase/init.js"></script>
      </html>
    )
  }
}
