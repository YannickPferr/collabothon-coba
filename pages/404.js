import { Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import styles from '../styles/404.module.css';

export default function FourOhFour() {
    const router = useRouter();
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
                src={'mock-images/404.png'}
                alt="Page Not Found"
                className={styles.fourOhFourImage}
            />
            <Link onClick={() => router.push('/')} underline="hover">
                <Typography
                    variant="h2"
                    display="block"
                    gutterBottom
                    className={styles.textLink}
                >
                    Return to Landing Page
                </Typography>
            </Link>
        </div>
    );
}
