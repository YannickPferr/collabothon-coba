import Link from '@mui/material/Link';
import styles from '../styles/Footer.module.css';

export default function Footer(props) {
    return (
        <div className={styles.footer}>
            <Link href="#" underline="hover">
                FAQ
            </Link>
            <Link href="#" underline="hover">
                Best Practices
            </Link>
            <Link href="#" underline="hover">
                Privacy Policy
            </Link>
            <Link href="#" underline="hover">
                Terms and Conditions
            </Link>
            <Link href="#" underline="hover">
                Support
            </Link>
            <Link href="#" underline="hover">
                Feedback
            </Link>
        </div>
    );
}
