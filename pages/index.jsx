import Footer from '../components/Footer';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { useAuth } from '../contexts/Auth';

export default function MainPage(props) {
    const { loggedIn } = useAuth();
    return (
        <>
            {loggedIn ? (
                <div>
                    <ResponsiveAppBar />
                    {props.children}
                    <Footer />
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
