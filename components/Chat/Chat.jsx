import List from '@mui/material/List';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth';
import db from '../../firebase.config';
import styles from '../../styles/Chat.module.css';
import ChatView from './ChatView';
import MessagePreview from './MessagePreview';

const msgs = [
    {
        chatId: '1',
        name: 'Yannick Pferr',
        message: 'Ich hoffe es geht dir gut',
    },
];

export default function Chat() {
    const { user } = useAuth();
    const [selectedChat, setSelectedChat] = useState(0);
    const [messages, setMessages] = useState([]);

    const fetchAllConversations = async () => {
        console.log(user);
        const conversationsRef = collection(db, 'conversation');
        const q = query(
            conversationsRef,
            where(user.role.toLowerCase(), '==', user.email)
        );
        const relevantConversations = await getDocs(q);
        relevantConversations.forEach((conversation) => {
            // doc.data() is never undefined for query doc snapshots
            const data = conversation.data();
            const chatId = conversation.id;
            const docRef = doc(
                db,
                'user',
                user.role === 'Buddy' ? data.migrant : data.buddy
            );
            getDoc(docRef).then((userDoc) => {
                const data = userDoc.data();
                const messagesRef = collection(db, 'message');
                const q = query(
                    messagesRef,
                    where('conversation', '==', chatId),
                    orderBy('time'),
                    limit(1)
                );
                getDocs(q).then((docs) => {
                    const messagesCopy = [...messages];
                    docs.forEach((doc) => {
                        messagesCopy.push({
                            chatId: chatId,
                            message: doc.get('message'),
                            toUser: { email: data.email, name: data.name },
                        });
                    });
                    setMessages(messagesCopy);
                });
            });
        });
    };

    useEffect(() => {
        fetchAllConversations();
    }, []);
    return (
        <div className={styles.chat}>
            <List sx={{ width: '100%', maxWidth: 360 }}>
                {messages.map((message, index) => (
                    <MessagePreview
                        key={message.toUser.name}
                        name={message.toUser.name}
                        message={message.message}
                        selectChat={setSelectedChat}
                        index={index}
                    ></MessagePreview>
                ))}
            </List>
            {messages.length > 0 && (
                <ChatView
                    chatId={messages[selectedChat].chatId}
                    toUser={messages[selectedChat].toUser}
                ></ChatView>
            )}
        </div>
    );
}
