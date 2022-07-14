import Link from '@mui/material/Link';
import styles from '../styles/Footer.module.css';

export default function Footer(props) {
    return (
        <div className={styles.footer}>
            <div className={styles.column}>
                <Link href="#">FAQ</Link>
                <Link href="#">Best Practices</Link>
            </div>
            <div className={styles.column}>
                <Link href="#">Privacy Policy</Link>
                <Link href="#">Terms and Conditions</Link>
            </div>
            <div className={styles.column}>
                <Link href="#">Support</Link>
                <Link href="#">Feedback</Link>
            </div>
        </div>
    );
}
