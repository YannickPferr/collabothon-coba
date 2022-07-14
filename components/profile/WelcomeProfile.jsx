import { Typography, Grid } from "@mui/material";
import styles from "../../styles/profile/profileSetup.module.css";

function Welcome() {
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
          Thank you for your iniciative in helping people!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Welcome;
