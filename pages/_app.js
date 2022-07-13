import '../styles/globals.css'
import { Layout } from "../components";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/*<link rel="icon" href="/favicon-compressed.png" />*/}
        <title>Re Network</title>
      </Head>


      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp
