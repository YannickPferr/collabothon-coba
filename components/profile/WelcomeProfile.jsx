import { Typography, Grid } from "@mui/material";
import styles from "../../styles/profile/profileSetup.module.css";

function Welcome({ isBuddy }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <div className={styles.welcomeImageContainer}>
          <img
            src={"mock-images/welcome.png"}
            alt="Welcome to our Application"
            className={styles.profileSetupImage}
          />
        </div>
      </Grid>
      <Grid item xs={7} className={styles.welcomeTextContainer}>
        <Typography variant="h3" align="center" className={styles.headerText}>
          {isBuddy ? "Thank you for your iniciative in helping people!" : "Let's find someone who can help you!"}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Welcome;
