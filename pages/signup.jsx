import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingIndicator from '../components/LoadingIndicator';
import Registration from '../components/Registration';
import { useAuth } from '../contexts/Auth';
import styles from '../styles/Signup.module.css';

export default function Signup() {
    const [selectedRole, setSelectedRole] = useState('');
    const { loggedIn, loading } = useAuth();
    const router = useRouter();

    const handleBuddyClick = async (e) => {
        e.preventDefault();
        setSelectedRole('Buddy');
    };

    const handleRefugeeClick = async (e) => {
        e.preventDefault();
        setSelectedRole('Refugee');
    };

    const textSizingNormal = {
        fontSize: {
            lg: 30,
            md: 20,
            sm: 15,
            xs: 15,
        },
    };

    const textSizingHeader = {
        fontSize: {
            lg: 40,
            md: 25,
            sm: 20,
            xs: 20,
        },
    };

    useEffect(() => {
        !loading && loggedIn && router.push('/network');
    }, [loading, loggedIn]);

    if (loading) return <LoadingIndicator />;

    return (
        <>
            {!loggedIn ? (
                selectedRole ? (
                    <Registration role={selectedRole}></Registration>
                ) : (
                    <div className={styles.main}>
                        <Typography
                            variant="h2"
                            className={styles.header}
                            sx={textSizingHeader}
                        >
                            Please select a role
                        </Typography>
                        <div className={styles.roleContainer}>
                            <div className={styles.buttonDiv}>
                                <Typography
                                    className={styles.roleName}
                                    sx={textSizingNormal}
                                >
                                    Buddy
                                </Typography>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    className={styles.buttonBuddy}
                                    onClick={handleBuddyClick}
                                ></Button>
                            </div>

                            <div className={styles.buttonDiv}>
                                <Typography
                                    className={styles.roleName}
                                    sx={textSizingNormal}
                                >
                                    Refugee / Migrant
                                </Typography>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    className={styles.buttonRefugee}
                                    onClick={handleRefugeeClick}
                                ></Button>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <></>
            )}
        </>
    );
}
