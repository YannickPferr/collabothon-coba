import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import Registration from '../components/Registration';
import { useAuth } from '../contexts/Auth';
import styles from '../styles/Signup.module.css';

export default function Signup() {
    const [selectedRole, setSelectedRole] = useState('');
    const { loggedIn } = useAuth();

    const handleBuddyClick = async (e) => {
        e.preventDefault();
        setSelectedRole('Buddy');
    };

    const handleRefugeeClick = async (e) => {
        e.preventDefault();
        setSelectedRole('Refugee');
    };

    return (
        <>
            {!loggedIn ? (
                selectedRole ? (
                    <Registration role={selectedRole}></Registration>
                ) : (
                    <div className={styles.main}>
                        <Typography variant="h2">
                            Please select a role
                        </Typography>
                        <div className={styles.roleContainer}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleBuddyClick}
                            >
                                Buddy
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleRefugeeClick}
                            >
                                Refugee
                            </Button>
                        </div>
                    </div>
                )
            ) : (
                <></>
            )}
        </>
    );
}
