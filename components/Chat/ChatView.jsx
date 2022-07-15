import SendIcon from '@mui/icons-material/Send';
import { Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { useAuth } from '../../contexts/Auth';
import db from '../../firebase.config';
import styles from '../../styles/ChatView.module.css';

export default function ChatView({ chatId, toUser, msgs }) {
    const { user } = useAuth();
    const [text, setText] = useState('');
    const ref = useRef(null);

    const sendMessage = async () => {
        if (!!text) {
            const docRef = await addDoc(collection(db, 'message'), {
                conversation: chatId,
                from: user.email,
                to: toUser.email,
                time: Timestamp.now(),
                message: text,
            });
            setText('');
            ref.current && ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleMessageInputChange = (e) => {
        setText(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.keyCode == 13) sendMessage();
    };

    return (
        <div className={styles.container}>
            <div className={styles.chatView}>
                <List sx={{ width: '100%', height: '100%' }}>
                    {msgs.map((message) => {
                        return (
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
                        );
                    })}
                    <div ref={ref} />
                </List>
            </div>
            <div className={styles.sendArea}>
                <TextField
                    autoComplete="off"
                    id="outlined-basic"
                    label="Write a message"
                    type="text"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={text}
                    onChange={handleMessageInputChange}
                    onKeyUp={handleKeyPress}
                    autoComplete="off"
                />
                <Button size="large" variant="contained" onClick={sendMessage}>
                    <SendIcon />
                </Button>
            </div>
        </div>
    );
}
