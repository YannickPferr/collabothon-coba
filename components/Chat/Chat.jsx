import { Typography } from "@mui/material";
import List from "@mui/material/List";
import { useState } from "react";
import { useAuth } from "../../contexts/Auth";
import styles from "../../styles/Chat.module.css";
import ChatView from "./ChatView";
import MessagePreview from "./MessagePreview";

export default function Chat({ conversations }) {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState(0);

  return (
    <div className={styles.chat}>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
        }}
      >
        {conversations[user.email]?.map((conversation, index) => (
          <MessagePreview
            key={conversation.toUser.name}
            name={conversation.toUser.name}
            message={
              conversation.messages[conversation.messages.length - 1]?.message
            }
            selectChat={setSelectedChat}
            index={index}
          ></MessagePreview>
        ))}
      </List>
      {conversations[user.email] ? (
        <ChatView
          chatId={conversations[user.email][selectedChat].chatId}
          toUser={conversations[user.email][selectedChat].toUser}
          msgs={conversations[user.email][selectedChat].messages}
        />
      ) : (
        <Typography variant="h2">No Chat</Typography>
      )}
    </div>
  );
}
