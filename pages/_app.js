import Head from 'next/head';
import Alerts from '../components/Alerts';
import AlertsProvider from '../contexts/Alerts';
import { AuthProvider } from '../contexts/Auth';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                {/*<link rel="icon" href="/favicon-compressed.png" />*/}
                <title>Re Network</title>
            </Head>
            <AuthProvider>
                <AlertsProvider>
                    <Alerts />
                    <Component {...pageProps} />
                </AlertsProvider>
            </AuthProvider>
        </>
    );
}

export default MyApp;
