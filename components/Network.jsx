import { useAuth } from '../contexts/Auth';
import styles from '../styles/Network.module.css';

export default function Network({ matchInfo }) {
    const { user } = useAuth();
    console.log(matchInfo[user.email]);
    return (
        <div className={styles.main}>
            <h1>Network</h1>
            {matchInfo[user.email].map((match, index) => (
                <li>{match.name}</li>
            ))}
        </div>
    );
}
