import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import Description from '../components/profile/Description';
import Interests from '../components/profile/Interests';
import Languages from '../components/profile/Languages';
import Location from '../components/profile/Location';
import Welcome from '../components/profile/WelcomeProfile';
import { useAuth } from '../contexts/Auth';
import styles from '../styles/Profile.module.css';

function CreateProfile() {
    const [activeStep, setActiveStep] = React.useState(0);
    const { user } = useAuth();
    const router = useRouter();
    const steps = [
        'Start',
        'Location',
        'Languages',
        'Interests',
        'Description',
    ];

    const pages = [
        <Welcome isBuddy={user?.role === 'Buddy'} />,
        <Location isBuddy={user?.role === 'Buddy'} />,
        <Languages isBuddy={user?.role === 'Buddy'} />,
        <Interests isBuddy={user?.role === 'Buddy'} />,
        <Description isBuddy={user?.role === 'Buddy'} />,
    ];

    const reroute = () => {
        router.push('/display-match');
    };

    return (
        <div className={styles.root}>
            <div className={styles.page}>{pages[activeStep]}</div>
            <div className={styles.buttonsDiv}>
                <Button
                    onClick={() =>
                        setActiveStep(activeStep === 0 ? 0 : activeStep - 1)
                    }
                    className={styles.backButton}
                    variant="contained"
                >
                    <Typography variant="h5">BACK</Typography>
                </Button>
                <Button
                    variant="contained"
                    className={styles.button}
                    onClick={() => {
                        activeStep >= 4
                            ? reroute()
                            : setActiveStep(activeStep + 1);
                    }}
                >
                    <Typography variant="h5">
                        {activeStep >= 4 ? 'Finish' : 'Next'}
                    </Typography>
                </Button>
            </div>

            <Stepper
                activeStep={activeStep}
                alternativeLabel
                className={styles.stepper}
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>
                            <Typography variant="h6">{label}</Typography>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}

export default CreateProfile;
