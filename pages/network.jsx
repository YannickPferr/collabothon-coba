import { Typography } from '@mui/material';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Footer from '../components/Footer';
import NetworkCard from '../components/NetworkCard';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { useAuth } from '../contexts/Auth';
import db from '../firebase.config';
import styles from '../styles/Network.module.css';

export default function Network(props) {
    const { loggedIn, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        !loggedIn && router.push('/login');
    }, [loggedIn]);

    return (
        <>
            {loggedIn && (
                <div style={{ height: '100vh' }}>
                    <ResponsiveAppBar />
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <Typography variant="h2">Your Network!</Typography>
                        </div>
                        <div className={styles.main}>
                            {props.network[user.email]?.map((match, index) => (
                                <NetworkCard
                                    name={match.name}
                                    email={match.email}
                                    skills={match.skills}
                                    languages={match.languages}
                                    chatId={match.conversation}
                                ></NetworkCard>
                            ))}
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            )}
        </>
    );
}

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
                    console.log(data);
                    if (skill == data.skillId) result.push(data.skillName);
                });
            })
        );
    }
    console.log(result);
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
    console.log(result);
    return result;
};

const fetchAllMatchInfos = async () => {
    const matchInfo = {};
    const conversationsRef = collection(db, 'conversation');
    const relevantConversations = await getDocs(conversationsRef);
    await Promise.all(
        relevantConversations.docs.map(async (conversation) => {
            // doc.data() is never undefined for query doc snapshots
            const convData = conversation.data();
            const docRefBuddy = doc(db, 'user', convData.buddy);
            const buddyDoc = await getDoc(docRefBuddy);
            const buddyData = buddyDoc.data();

            const docRefMigrant = doc(db, 'user', convData.migrant);
            const migrantDoc = await getDoc(docRefMigrant);
            const migrantData = migrantDoc.data();

            const buddySkills = await fetchAllSkills(buddyData.email);
            const migrantSkills = await fetchAllSkills(migrantData.email);

            const buddyLanguages = await fetchAllLanguages(buddyData.email);
            const migrantLanguages = await fetchAllLanguages(migrantData.email);

            if (!matchInfo[migrantData.email])
                matchInfo[migrantData.email] = [];
            matchInfo[migrantData.email].push({
                name: buddyData.name,
                email: buddyData.email,
                skills: buddySkills,
                languages: buddyLanguages,
                conversation: conversation.id,
            });

            if (!matchInfo[buddyData.email]) matchInfo[buddyData.email] = [];
            matchInfo[buddyData.email].push({
                name: migrantData.name,
                email: migrantData.email,
                skills: migrantSkills,
                languages: migrantLanguages,
                conversation: conversation.id,
            });
        })
    );
    return matchInfo;
};

export async function getStaticProps() {
    const network = await fetchAllMatchInfos();
    return {
        props: {
            network: JSON.parse(JSON.stringify(network)),
        },
    };
}
