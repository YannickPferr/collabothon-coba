import { Link, Typography } from "@mui/material";
import styles from "../styles/404.module.css";

export default function FourOhFour() {
  return (
    <div className={styles.main}>
      <Typography
        variant="h2"
        display="block"
        gutterBottom
        className={styles.textBanner}
      >
        Page Not Found
      </Typography>
      <img
        src={"mock-images/404.png"}
        alt="Page Not Found"
        className={styles.fourOhFourImage}
      />
      <Link href="signup" underline="hover">
        <Typography
          variant="h2"
          display="block"
          gutterBottom
          className={styles.textLink}
        >
          Navigate Back
        </Typography>
      </Link>
    </div>
  );
}
