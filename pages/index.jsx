import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Chat from '../components/Chat/Chat';
import Forum from '../components/Forum';
import Network from '../components/Network';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { useAuth } from '../contexts/Auth';
import db from '../firebase.config';

export default function MainPage(props) {
    const { user, loggedIn } = useAuth();
    const [selectedPage, setSelectedPage] = useState('Network');

    const [conversations, setConversations] = useState(props.conversations);

    const components = {
        Network: <Network matchInfo={props.network} />,
        Forum: <Forum />,
        Chat: <Chat conversations={conversations} />,
    };

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'message'), (doc) => {
            const convCopy = JSON.parse(JSON.stringify(conversations));
            doc.docChanges().forEach((change) => {
                const changedData = change.doc.data();
                convCopy[changedData.from]
                    .find(
                        (conversation) =>
                            conversation.chatId === changedData.conversation
                    )
                    .messages?.push(changedData);
                convCopy[changedData.to]
                    .find(
                        (conversation) =>
                            conversation.chatId === changedData.conversation
                    )
                    .messages?.push(changedData);
            });
            setConversations(convCopy);
        });
        return () => unsub();
    }, []);

    return (
        <>
            {loggedIn ? (
                <div style={{ height: '100vh' }}>
                    <ResponsiveAppBar
                        selectPage={(page) => setSelectedPage(page)}
                    />
                    <div>{components[selectedPage]}</div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

const fetchAllMessages = async (chatId) => {
    const messagesRef = collection(db, 'message');
    const q = query(
        messagesRef,
        where('conversation', '==', chatId),
        orderBy('time')
    );
    const allMessages = [];
    const docs = await getDocs(q);
    docs.forEach((msg) => {
        const data = msg.data();
        allMessages.push({
            chatId: chatId,
            from: data.from,
            to: data.to,
            message: data.message,
            time: data.time,
        });
    });
    return allMessages;
};

const fetchAllConversations = async () => {
    const conversations = {};
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

            const messages = await fetchAllMessages(conversation.id);

            if (!conversations[migrantData.email])
                conversations[migrantData.email] = [];
            conversations[migrantData.email].push({
                chatId: conversation.id,
                toUser: { email: buddyData.email, name: buddyData.name },
                messages,
            });

            if (!conversations[buddyData.email])
                conversations[buddyData.email] = [];
            conversations[buddyData.email].push({
                chatId: conversation.id,
                toUser: { email: migrantData.email, name: migrantData.name },
                messages,
            });
        })
    );
    return conversations;
};

const fetchAllSkills = async (email) => {
    const docRef = doc(db, 'user', email);
    const user = await getDoc(docRef);
    const skills = await user.get('skill');
    return skills;
};

const fetchAllLanguages = async (email) => {
    const docRef = doc(db, 'user', email);
    const user = await getDoc(docRef);
    const languages = await user.get('languageId');
    return languages;
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
            });

            if (!matchInfo[buddyData.email]) matchInfo[buddyData.email] = [];
            matchInfo[buddyData.email].push({
                name: migrantData.name,
                email: migrantData.email,
                skills: migrantSkills,
                languages: migrantLanguages,
            });
        })
    );
    return matchInfo;
};

export async function getStaticProps() {
    const conversations = await fetchAllConversations();
    const network = await fetchAllMatchInfos();
    console.log(JSON.parse(JSON.stringify(conversations)));
    return {
        props: {
            conversations: JSON.parse(JSON.stringify(conversations)),
            network: JSON.parse(JSON.stringify(network)),
        },

        revalidate: 5,
    };
}
