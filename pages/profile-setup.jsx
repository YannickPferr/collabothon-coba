import styles from "../styles/Profile.module.css";
import React from "react";
import { Box, Stepper, StepLabel, Step, Typography, Button } from "@mui/material";
import Welcome from "../components/profile/WelcomeProfile";
import Location from "../components/profile/Location";
import Languages from "../components/profile/Languages";
import Interests from "../components/profile/Interests";
import Description from "../components/profile/Description";

function CreateProfile() {
    const [activeStep, setActiveStep] = React.useState(0);

    const steps = [
    'Start',
    'Location',
    'Languages',
    'Interests',
    'Description'
    ];

    const pages = [<Welcome/>, <Location/>, <Languages/>, <Interests/>, <Description/>]

    return (
        <div className={styles.root}>
            <div className={styles.page}>
                {pages[activeStep]}
            </div>
            <Button variant="contained" color="primary" fullWidth className={styles.button} onClick={() => {activeStep>=4 ? console.log("FINISHED"): setActiveStep(activeStep+1)}}>
                <Typography variant="h3">
                    {activeStep>=4 ? "Finish" : "Next"}
                </Typography>
            </Button>
            <Button onClick={() => setActiveStep(activeStep===0 ? 0 : activeStep-1)}>back</Button>

            <Button onClick={() => setActiveStep(0)}>
                restart
            </Button>
                <Stepper activeStep={activeStep} alternativeLabel className={styles.stepper}>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>
                            <Typography variant="h6" >
                                {label}
                            </Typography>
                        </StepLabel>
                    </Step>
                    ))}
                </Stepper>
        
        </div>
    )
}

export default CreateProfile;