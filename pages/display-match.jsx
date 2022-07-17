import { Button, CircularProgress, Typography } from '@mui/material';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import LoadingIndicator from '../components/LoadingIndicator';
import NetworkCard from '../components/NetworkCard';
import { useAuth } from '../contexts/Auth';
import db from '../firebase.config';
import styles from '../styles/DisplayMatch.module.css';

export default function DisplayMatch() {
    const fetchAllSkills = async (email) => {
        const docRef = doc(db, 'user', email);
        const user = await getDoc(docRef);
        const skills = await user.get('skill');
        const result = [];
        if (skills) {
            const skillRef = collection(db, 'skills');
            const skillCollection = await getDocs(skillRef);
            await Promise.all(
                skills.map(async (skill) => {
                    skillCollection.docs.map((sk) => {
                        const data = sk.data();
                        if (skill == data.skillId) result.push(data.skillName);
                    });
                })
            );
        }
        return result;
    };

    const fetchAllLanguages = async (email) => {
        const docRef = doc(db, 'user', email);
        const user = await getDoc(docRef);
        const languages = await user.get('languageId');
        const result = [];
        if (languages) {
            const languagesRef = collection(db, 'languages');
            const languageCollection = await getDocs(languagesRef);
            await Promise.all(
                languages.map(async (language) => {
                    languageCollection.docs.map((l) => {
                        const data = l.data();
                        if (language == data.languageId)
                            result.push(data.languageName);
                    });
                })
            );
        }
        return result;
    };

    const fetchAllMatchInfos = async () => {
        const matchInfo = [];
        const conversationsRef = collection(db, 'conversation');
        const role = user.role === 'Buddy' ? 'buddy' : 'migrant';
        const q = query(conversationsRef, where(role, '==', user.email));
        const relevantConversations = await getDocs(q);
        await Promise.all(
            relevantConversations.docs.map(async (conversation) => {
                const convData = conversation.data();
                if (user.role === 'Buddy') {
                    const docRefMigrant = doc(db, 'user', convData.migrant);
                    const migrantDoc = await getDoc(docRefMigrant);
                    const migrantData = migrantDoc.data();

                    const migrantSkills = await fetchAllSkills(
                        migrantData.email
                    );
                    const migrantLanguages = await fetchAllLanguages(
                        migrantData.email
                    );

                    matchInfo.push({
                        name: migrantData.name,
                        email: migrantData.email,
                        skills: migrantSkills,
                        languages: migrantLanguages,
                        conversation: conversation.id,
                    });
                } else {
                    const docRefBuddy = doc(db, 'user', convData.buddy);
                    const buddyDoc = await getDoc(docRefBuddy);
                    const buddyData = buddyDoc.data();

                    const buddySkills = await fetchAllSkills(buddyData.email);
                    const buddyLanguages = await fetchAllLanguages(
                        buddyData.email
                    );

                    matchInfo.push({
                        name: buddyData.name,
                        email: buddyData.email,
                        skills: buddySkills,
                        languages: buddyLanguages,
                        conversation: conversation.id,
                    });
                }
            })
        );
        console.log(matchInfo);
        setMatches(matchInfo);
    };

    const { loggedIn, user, loading } = useAuth();
    const router = useRouter();

    const [matches, setMatches] = useState([]);

    useEffect(() => {
        if (!loading) {
            if (loggedIn) fetchAllMatchInfos();
            else router.push('/login');
        }
    }, [loading, loggedIn]);

    if (loading) return <LoadingIndicator />;

    return (
        <>
            {loggedIn &&
                (matches.length > 0 ? (
                    <div>
                        <div className={styles.container}>
                            <Confetti />
                            <div className={styles.header}>
                                <Typography
                                    variant="h2"
                                    style={{ color: 'white' }}
                                >
                                    Congratulations!
                                </Typography>
                                <Typography
                                    variant="h4"
                                    style={{ color: 'white' }}
                                >
                                    You were matched with the following buddies
                                </Typography>
                            </div>
                            <div className={styles.mainDisplayMatch}>
                                {matches.map((match, index) => (
                                    <NetworkCard
                                        name={match.name}
                                        email={match.email}
                                        skills={match.skills}
                                        languages={match.languages}
                                        chatId={match.conversation}
                                        showChatIcon={false}
                                    ></NetworkCard>
                                ))}
                            </div>
                        </div>
                        <div className={styles.buttonContainer}>
                            <Button
                                className={styles.continueButton}
                                onClick={() => router.push('/network')}
                                variant="contained"
                            >
                                <Typography variant="h5">Continue</Typography>
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.loadingScreen}>
                        <Typography variant="h2" style={{ color: 'white' }}>
                            Finding your buddies
                        </Typography>
                        <CircularProgress size={200} thickness={4} />
                    </div>
                ))}
        </>
    );
}
