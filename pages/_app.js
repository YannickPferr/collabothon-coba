import Head from "next/head";
import Alerts from "../components/Alerts";
import Footer from "../components/Footer";
import AlertsProvider from "../contexts/Alerts";
import { AuthProvider } from "../contexts/Auth";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="White_Notext.svg" />
        <title>ReNetwork</title>
      </Head>
      <AuthProvider>
        <AlertsProvider>
          <Alerts />
          <Component {...pageProps} />
          <Footer appJs={true}></Footer>
        </AlertsProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
