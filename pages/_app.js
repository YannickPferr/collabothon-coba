import Alerts from '../components/Alerts';
import '../styles/globals.css';
import AlertsProvider from '../utils/AlertsContext';

function MyApp({ Component, pageProps }) {
    return (
        <AlertsProvider>
          <Alerts></Alerts>
            <Component {...pageProps} />
        </AlertsProvider>
    );
}

export default MyApp;
