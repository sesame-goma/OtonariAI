import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import "firebase/firestore";
import { db } from "../../utils/firebase/initFirebase";
import { Message } from "../../types/index";
import { useUser } from "../../utils/firebase/useUser";

const ListPage = () => {
  // const { user } = useUser();
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (user) {
      const result = db
        .collection("reservation")
        .where("user_id", "==", user.id)
        .orderBy("created_at")
        .get()
        .then((snapShot) => {
          let messages: Message[] = [];
          snapShot.forEach((doc) => {
            const content = doc.data().content;
            const create = doc.data().created_at.toDate().toString();
            messages.push({
              id: doc.id,
              content: content,
              created_at: create,
            });
            setMessages({ ...messages });
          });
        });
      // setMessages(result);
    }
  }, [user]);
  if (!user) {
    return <p>ログインしましょう</p>;
  }
  if (!Object.keys(messages).length) {
    return <p>loading</p>;
  }

  return (
    <Layout title="reservation List | Next.js + TypeScript Example">
      <h1>reservation List</h1>
      <p>予約一覧のリスト</p>
      <p>You are currently </p>
      {Object.keys(messages).map((key) => (
        <li
          key={messages[key]["id"]}
        >{`${messages[key]["content"]}${messages[key]["created_at"]}`}</li>
      ))}
      <Link href="/">
        <a>Go home</a>
      </Link>
    </Layout>
  );
};

export default ListPage;
