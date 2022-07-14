import Link from '@mui/material/Link';
import { useRouter } from 'next/router';
import styles from '../styles/Footer.module.css';

export default function Footer(props) {
    const router = useRouter();
    return (
        <div className={styles.footer}>
            <Link onClick={() => router.push('/faq')} underline="hover">
                FAQ
            </Link>
            <Link
                onClick={() => router.push('/best-practices')}
                underline="hover"
            >
                Best Practices
            </Link>
            <Link
                onClick={() => router.push('/privacy-policy')}
                underline="hover"
            >
                Privacy Policy
            </Link>
            <Link
                onClick={() => router.push('/terms-and-conditions')}
                underline="hover"
            >
                Terms and Conditions
            </Link>
            <Link onClick={() => router.push('/support')} underline="hover">
                Support
            </Link>
            <Link onClick={() => router.push('/feedback')} underline="hover">
                Feedback
            </Link>
        </div>
    );
}
