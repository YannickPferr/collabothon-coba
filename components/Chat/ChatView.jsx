import { Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import {
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
    Timestamp,
    where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth';
import db from '../../firebase.config';
import styles from '../../styles/ChatView.module.css';

export default function ChatView({ chatId, toUser }) {
    const { user } = useAuth();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const fetchAllMessages = async () => {
        const messagesRef = collection(db, 'message');
        const q = query(
            messagesRef,
            where('conversation', '==', chatId),
            orderBy('time')
        );
        const allMessages = [];
        getDocs(q).then((docs) => {
            docs.forEach((msg) => {
                const data = msg.data();
                allMessages.push({
                    chatId: chatId,
                    from: data.from,
                    to: data.to,
                    message: data.message,
                });
            });
            setMessages(allMessages);
        });
    };

    useEffect(() => {
        fetchAllMessages();
    }, []);

    useEffect(() => {
        setTimeout(() => fetchAllMessages(), 5000);
    }, [messages]);

    const sendMessage = async () => {
        const docRef = await addDoc(collection(db, 'message'), {
            conversation: chatId,
            from: user.email,
            to: toUser.email,
            time: Timestamp.now(),
            message,
        });
        const messagesCopy = [...messages];
        messagesCopy.push({
            conversation: chatId,
            from: user.email,
            to: toUser.email,
            time: Timestamp.now(),
            message,
        });
        setMessages(messagesCopy);
    };

    const handleMessageInputChange = (e) => {
        setMessage(e.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.chatView}>
                <List sx={{ width: '100%' }}>
                    {messages.map((message) => (
                        <div
                            className={
                                message.from === user.email
                                    ? styles.rightContainer
                                    : styles.leftContainer
                            }
                        >
                            <ListItem
                                key={message.time}
                                className={
                                    message.from === user.email
                                        ? styles.chatBubbleRight
                                        : styles.chatBubbleLeft
                                }
                            >
                                <ListItemText
                                    className={
                                        message.from === user.email
                                            ? styles.textRight
                                            : styles.textLeft
                                    }
                                    primary={message.message}
                                />
                            </ListItem>
                        </div>
                    ))}
                </List>
            </div>
            <div className={styles.chatView}>
                <TextField
                    id="outlined-basic"
                    label="Write a message"
                    type="text"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={message}
                    onChange={handleMessageInputChange}
                />
                <Button size="large" variant="contained" onClick={sendMessage}>
                    Send
                </Button>
            </div>
        </div>
    );
}
