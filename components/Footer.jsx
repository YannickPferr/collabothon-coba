import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import styles from "../styles/Footer.module.css";

export default function Footer(props) {
  return (
    <div className={styles.footer}>
      <Link href="/faq" underline="hover">
        <Typography color={"white"}>
          FAQ
        </Typography>
      </Link>
      <Link href="/best-practices" underline="hover">
        <Typography color={"white"}>
          Best Practices
        </Typography>
      </Link>
      <Link href="/privacy-policy" underline="hover">
        <Typography color={"white"}>
          Privacy Policy
        </Typography>
      </Link>
      <Link href="/terms-and-conditions" underline="hover">
        <Typography color={"white"}>
          Terms and Conditions
        </Typography>
      </Link>
      <Link href="/support" underline="hover">
        <Typography color={"white"}>
          Support
        </Typography>
      </Link>
      <Link href="/feedback" underline="hover">
        <Typography color={"white"}>
          Feedback
        </Typography>
      </Link>
    </div>
  );
}
