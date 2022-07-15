import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingIndicator from '../components/LoadingIndicator';
import { useAuth } from '../contexts/Auth';

export default function MainPage(props) {
    const { loggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        !loggedIn ? router.push('/login') : router.push('/network');
    }, [loggedIn]);

    return <LoadingIndicator />;
}
