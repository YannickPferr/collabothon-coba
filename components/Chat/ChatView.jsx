import { Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useAuth } from '../../contexts/Auth';
import db from '../../firebase.config';
import styles from '../../styles/ChatView.module.css';

export default function ChatView({ chatId, toUser, msgs }) {
    const { user } = useAuth();
    const [text, setText] = useState('');

    const sendMessage = async () => {
        const docRef = await addDoc(collection(db, 'message'), {
            conversation: chatId,
            from: user.email,
            to: toUser.email,
            time: Timestamp.now(),
            message: text,
        });
        setText('');
    };

    const handleMessageInputChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.chatView}>
                <List sx={{ width: '100%' }}>
                    {msgs.map((message) => (
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
                    value={text}
                    onChange={handleMessageInputChange}
                />
                <Button size="large" variant="contained" onClick={sendMessage}>
                    Send
                </Button>
            </div>
        </div>
    );
}
