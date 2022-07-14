import { Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import styles from '../styles/Footer.module.css';

export default function Footer(props) {
  const router = useRouter();
  return (
    <div className={styles.footer}>
      <Link onClick={() => router.push('/faq')} underline="hover">
        <Typography color={"white"}>
          FAQ
        </Typography>
      </Link>
      <Link
        onClick={() => router.push('/best-practices')}
        underline="hover"
      >
        <Typography color={"white"}>
          Best Practices
        </Typography>
      </Link>
      <Link
        onClick={() => router.push('/privacy-policy')}
        underline="hover"
      >
        <Typography color={"white"}>
          Privacy Policy
        </Typography>
      </Link>
      <Link
        onClick={() => router.push('/terms-and-conditions')}
        underline="hover"
      >
        <Typography color={"white"}>
          Terms and Conditions
        </Typography>
      </Link>
      <Link onClick={() => router.push('/support')} underline="hover">
        <Typography color={"white"}>
          Support
        </Typography>
      </Link>
      <Link onClick={() => router.push('/feedback')} underline="hover">
        <Typography color={"white"}>
          Feedback
        </Typography>
      </Link>
    </div>
  );
}
