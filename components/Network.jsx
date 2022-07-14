import { Typography } from "@mui/material";
import { useAuth } from "../contexts/Auth";
import styles from "../styles/Network.module.css";
import RecipeReviewCard from "./RecipeReviewCard";

export default function Network({ matchInfo }) {
  const { user } = useAuth();
  return (
    <>
      <div className={styles.header}>
        <Typography variant="h2">Your Network!</Typography>
      </div>
      <div className={styles.main}>
        {matchInfo[user.email]?.map((match, index) => (
          <RecipeReviewCard
            name={match.name}
            email={match.email}
            skills={match.skills}
            languages={match.languages}
          ></RecipeReviewCard>
        ))}
      </div>
    </>
  );
}
