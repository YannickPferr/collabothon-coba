import { TextField, Typography, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import styles from "../../styles/profile/profileSetup.module.css";

function Description({ isBuddy }) {
  const [description, setDescription] = React.useState("");

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={4}>
        <div className={styles.locationImageContainer}>
          <img
            src={"mock-images/buddy-hobbies.png"}
            alt="Languages"
            className={styles.profileSetupImage}
          />
        </div>
      </Grid>
      <Grid item xs={8}>
        <Typography
          align="center"
          variant="h3"
          className={styles.languageHeader}
        >
          Describe yourself in a few words!
        </Typography>
        <TextField
          fullWidth
          label="Description"
          margin="dense"
          multiline
          rows="10"
          value={description}
          onChange={(e) => handleChangeDescription(e)}
        />
      </Grid>
    </Grid>
  );
}

export default Description;
