import { useState } from 'react';
import Chat from '../components/Chat/Chat';
import Forum from '../components/Forum';
import Network from '../components/Network';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { useAuth } from '../contexts/Auth';

export default function MainPage(props) {
    const { loggedIn } = useAuth();
    const [selectedPage, setSelectedPage] = useState('Network');
    const components = {
        Network: <Network />,
        Forum: <Forum />,
        Chat: <Chat />,
    };

    return (
        <>
            {loggedIn ? (
                <div style={{ height: '100vh' }}>
                    <ResponsiveAppBar
                        selectPage={(page) => setSelectedPage(page)}
                    />
                    <div>{components[selectedPage]}</div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
