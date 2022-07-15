import {
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  Grid,
  ListItem,
  Typography,
} from "@mui/material";
import db from "../../firebase.config";
import { collection, getDocs } from "firebase/firestore";
import React from "react";
import styles from "../../styles/profile/profileSetup.module.css";

function Interests() {
  const [skillsList, setSkillsList] = React.useState([]);

  React.useEffect(() => {
    async function getSkills(db) {
      const skillsCol = collection(db, "skills");
      const skillsSnapshot = await getDocs(skillsCol);
      const skillList = skillsSnapshot.docs.map((doc) => doc.data());
      if (skillsList.length === 0) {
        skillList.forEach((skill) => {
          setSkillsList((skillsList) => [
            ...skillsList,
            { name: skill.skillName, id: skill.skillId, selected: false },
          ]);
        });
      }
    }
    getSkills(db);
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item xs={4}>
        <div className={styles.locationImageContainer}>
          <img
            src={"mock-images/categories.png"}
            alt="Languages"
            className={styles.profileSetupImage}
          />
        </div>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h3" className={styles.languageHeader}>
          Select your Superpowers!
        </Typography>
        <FormGroup>
          {skillsList.map((currentSkill) => (
            <FormControlLabel
              control={
                <Checkbox
                  value={currentSkill.selected}
                  onChange={() => {
                    const newSkillsList = skillsList.map((skill) => {
                      if (skill.skillId === currentSkill.skillId) {
                        return { ...skill, selected: !skill.selected };
                      }
                      return skill;
                    });
                    setSkillsList(newSkillsList);
                  }}
                />
              }
              label={currentSkill.name}
            />
          ))}
        </FormGroup>
      </Grid>
    </Grid>
  );
}

export default Interests;
