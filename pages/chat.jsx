import List from '@mui/material/List';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ChatView from '../components/Chat/ChatView';
import MessagePreview from '../components/Chat/MessagePreview';
import Footer from '../components/Footer';
import LoadingIndicator from '../components/LoadingIndicator';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { useAuth } from '../contexts/Auth';
import db from '../firebase.config';
import styles from '../styles/Chat.module.css';

export default function Chat() {
    const fetchAllMessgages = () => {
        const messagesRef = collection(db, 'message');
        const unsub = onSnapshot(messagesRef, (doc) => {
            const newMessages = [];
            doc.docChanges().forEach((change) => {
                const changedData = change.doc.data();
                if (
                    changedData.from === user.email ||
                    changedData.to === user.email
                )
                    newMessages.push({
                        chatId: changedData.conversation,
                        data: changedData,
                    });
            });
            newMessages.forEach((msg) => {
                setConversations((oldState) => ({
                    ...oldState,
                    [msg.chatId]: {
                        ...oldState[msg.chatId],
                        messages: oldState[msg.chatId]
                            ? [...oldState[msg.chatId].messages, msg.data]
                            : [msg.data],
                    },
                }));
            });
        });
        return unsub;
    };

    const fetchAllConversations = async () => {
        const convs = {};
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

                    convs[conversation.id] = {
                        name: migrantData.name,
                        email: migrantData.email,
                        messages: conversations[conversation.id]?.messages
                            ? conversations[conversation.id]?.messages
                            : [],
                    };
                } else {
                    const docRefBuddy = doc(db, 'user', convData.buddy);
                    const buddyDoc = await getDoc(docRefBuddy);
                    const buddyData = buddyDoc.data();

                    convs[conversation.id] = {
                        name: buddyData.name,
                        email: buddyData.email,
                        messages: conversations[conversation.id]?.messages
                            ? conversations[conversation.id]?.messages
                            : [],
                    };
                }
            })
        );
        const unsub = await fetchAllMessgages();
        setConversations(convs);
        return unsub;
    };

    const { user, loggedIn, loading } = useAuth();
    const router = useRouter();

    const [conversations, setConversations] = useState({});
    const [selectedChat, setSelectedChat] = useState(0);

    useEffect(() => {
        router.query.chatId &&
            !loading &&
            setSelectedChat(
                Object.keys(conversations).findIndex(
                    (chatId) => chatId === router.query.chatId
                )
            );
    }, [router.query.chatId, conversations]);

    useEffect(() => {
        if (!loading) {
            if (loggedIn) fetchAllConversations();
            else router.push('/login');
        }
    }, [loading, loggedIn]);

    if (loading) return <LoadingIndicator />;

    return (
        <>
            {loggedIn && (
                <div>
                    <ResponsiveAppBar />
                    <div className={styles.container}>
                        <div className={styles.chat}>
                            <List
                                sx={{
                                    width: '100%',
                                    maxWidth: 360,
                                    height: '100%',
                                    overflow: 'auto',
                                }}
                            >
                                {Object.keys(conversations)?.map(
                                    (chatId, index) => (
                                        <MessagePreview
                                            key={chatId}
                                            name={conversations[chatId].name}
                                            message={
                                                conversations[chatId].messages[
                                                    conversations[chatId]
                                                        .messages.length - 1
                                                ]?.message
                                            }
                                            selectChat={setSelectedChat}
                                            index={index}
                                        ></MessagePreview>
                                    )
                                )}
                            </List>
                            {Object.keys(conversations)[selectedChat] ? (
                                <ChatView
                                    chatId={
                                        Object.keys(conversations)[selectedChat]
                                    }
                                    conversation={
                                        conversations[
                                            Object.keys(conversations)[
                                                selectedChat
                                            ]
                                        ]
                                    }
                                />
                            ) : (
                                <LoadingIndicator />
                            )}
                        </div>
                    </div>
                    <Footer appJs={false}></Footer>
                </div>
            )}
        </>
    );
}
