import Link from "@mui/material/Link";
import styles from "../styles/Footer.module.css";

export default function Footer(props) {
  return (
    <div className={styles.footer}>
      <Link href="/faq" underline="hover">
        FAQ
      </Link>
      <Link href="/best-practices" underline="hover">
        Best Practices
      </Link>
      <Link href="/privacy-policy" underline="hover">
        Privacy Policy
      </Link>
      <Link href="/terms-and-conditions" underline="hover">
        Terms and Conditions
      </Link>
      <Link href="/support" underline="hover">
        Support
      </Link>
      <Link href="/feedback" underline="hover">
        Feedback
      </Link>
    </div>
  );
}
