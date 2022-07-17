import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Button, Grid, MobileStepper, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import styles from '../styles/WelcomePage.module.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function WelcomePage() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = 4;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const steps = [
        {
            imgURL: '/mock-images/digital-handshake.png',
            headline: 'Re(fugee) Network',
            body: 'Our passion is to connect locals with refugees. Refugees need social connection and help to feel comfortable in their new home country. Why not hang out with your Buddy? Since our foundation, we have been pursuing the goal of helping where the need is greatest.',
        },
        {
            imgURL: '/mock-images/iceberg.png',
            headline: 'Solving underlying problems',
            body: 'For many people, escape is just the tip of the iceberg. The Russian invasion of Ukraine has changed our world significantly. As a member of the international community, we feel obliged to contribute to humanitarian tragedies. There are 3.7 million refugees who have already fled from the Ukraine and need to settle in foreign countries. To help them overcome challenges in their daily life, buddies with diverse expertise are helping worldwide. Our vision is to make the world a better place.',
        },
        {
            imgURL: '/mock-images/buddies-superheroes.png',
            headline: 'Our buddies have superpowers',
            body: 'Refugees are not alone. Our community supports refugees worldwide. Personal Buddys are either locals or former refugees. Personal superheroes! Mentoring, Networking, Knowledge, Communication, Integration',
        },
        {
            imgURL: '/mock-images/network3.png',
            headline: 'You are not alone!',
            body: 'In Re-Network, each Refugee will have up to three buddys. There is also an experienced community between the buddies who support each other. We believe that the network of expertise could benefit all parties. The needs of refugees and the knowledge of buddys will be matched after the refugees explicitly state where they need help most urgently.',
        },
    ];

    return (
        <div className={styles.root}>
            <Typography variant="h1" color={'white'}>
                Discover ReNetwork
            </Typography>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                interval={6000}
            >
                {steps.map((step, index) => (
                    <div className={styles.cards} key={index}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Paper
                                elevation={6}
                                className={styles.carouselPaperContainer}
                            >
                                <Grid container spacing={6}>
                                    <Grid item xs={4}>
                                        <div
                                            className={
                                                styles.carouselImageContainer
                                            }
                                        >
                                            <img
                                                src={step.imgURL}
                                                alt={step.headline}
                                                className={styles.carouselImage}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <div
                                            className={
                                                styles.carouselTextContainer
                                            }
                                        >
                                            <Typography
                                                className={styles.cardHeadline}
                                                variant="h3"
                                            >
                                                {step.headline}
                                            </Typography>
                                            <Typography
                                                className={styles.cardContent}
                                                variant="body1"
                                            >
                                                {step.body}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                className={styles.stepper}
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                    >
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
            <Button href="/" className={styles.endTourLink}>
                End Tour
            </Button>
        </div>
    );
}

export default WelcomePage;
