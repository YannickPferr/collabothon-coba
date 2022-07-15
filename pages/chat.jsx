import { Typography } from "@mui/material";
import List from "@mui/material/List";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChatView from "../components/Chat/ChatView";
import MessagePreview from "../components/Chat/MessagePreview";
import Footer from "../components/Footer";
import LoadingIndicator from "../components/LoadingIndicator";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { useAuth } from "../contexts/Auth";
import db from "../firebase.config";
import styles from "../styles/Chat.module.css";

export default function Chat(props) {
  const { user, loggedIn } = useAuth();
  const router = useRouter();

  const [update, setUpdate] = useState(false);
  const [conversations, setConversations] = useState(props.conversations);
  const [selectedChat, setSelectedChat] = useState(0);

  useEffect(() => {
    if (router.query.chatId && user)
      setSelectedChat(
        conversations[user.email].findIndex(
          (conversation) => conversation.chatId === router.query.chatId
        )
      );
  }, [router.query.chatId]);

  useEffect(() => {
    !loggedIn && router.push("/login");
  }, [loggedIn]);

  useEffect(() => {
    if (update) {
      setConversations(props.conversations);
      setUpdate(false);
    }
  }, [update]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "message"), (doc) => {
      const newMessages = [];
      doc.docChanges().forEach((change) => {
        const changedData = change.doc.data();
        props.conversations[changedData.from]
          .find(
            (conversation) => conversation.chatId === changedData.conversation
          )
          .messages?.push(changedData);

        props.conversations[changedData.to]
          .find(
            (conversation) => conversation.chatId === changedData.conversation
          )
          .messages?.push(changedData);
      });
      setUpdate(true);
    });
    return () => unsub();
  }, []);

  return (
    <>
      {loggedIn ? (
        <div>
          <ResponsiveAppBar />
          <div className={styles.container}>
            <div className={styles.chat}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                }}
              >
                {user &&
                  conversations &&
                  conversations[user.email]?.map((conversation, index) => (
                    <MessagePreview
                      key={conversation.toUser.name}
                      name={conversation.toUser.name}
                      message={
                        conversation.messages[conversation.messages.length - 1]
                          ?.message
                      }
                      selectChat={setSelectedChat}
                      index={index}
                    ></MessagePreview>
                  ))}
              </List>
              {user && conversations[user.email] ? (
                <ChatView
                  chatId={conversations[user.email][selectedChat].chatId}
                  toUser={conversations[user.email][selectedChat].toUser}
                  msgs={conversations[user.email][selectedChat].messages}
                />
              ) : (
                <Typography variant="h2">No Chat</Typography>
              )}
            </div>
          </div>
          <Footer appJs={false}></Footer>
        </div>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
}

const fetchAllConversations = async () => {
  const conversations = {};
  const conversationsRef = collection(db, "conversation");
  const relevantConversations = await getDocs(conversationsRef);
  await Promise.all(
    relevantConversations.docs.map(async (conversation) => {
      // doc.data() is never undefined for query doc snapshots
      const convData = conversation.data();
      const docRefBuddy = doc(db, "user", convData.buddy);
      const buddyDoc = await getDoc(docRefBuddy);
      const buddyData = buddyDoc.data();

      const docRefMigrant = doc(db, "user", convData.migrant);
      const migrantDoc = await getDoc(docRefMigrant);
      const migrantData = migrantDoc.data();

      if (!conversations[migrantData.email])
        conversations[migrantData.email] = [];
      conversations[migrantData.email].push({
        chatId: conversation.id,
        toUser: { email: buddyData.email, name: buddyData.name },
        messages: [],
      });

      if (!conversations[buddyData.email]) conversations[buddyData.email] = [];
      conversations[buddyData.email].push({
        chatId: conversation.id,
        toUser: { email: migrantData.email, name: migrantData.name },
        messages: [],
      });
    })
  );
  return conversations;
};

export async function getStaticProps() {
  const conversations = await fetchAllConversations();
  return {
    props: {
      conversations: JSON.parse(JSON.stringify(conversations)),
    },
  };
}
