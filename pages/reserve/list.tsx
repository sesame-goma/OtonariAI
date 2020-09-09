import Link from "next/link";
import Layout from "../../components/Layout";
import "firebase/firestore";
import { db } from "../../utils/firebase/initFirebase";
import { Message } from "../../types/index";
import { parseCookies } from "nookies";
import { NextPageContext } from "next";

type Props = {
  messages: Message[];
};

const ListPage = ({ messages }: Props) => {
  return (
    <Layout title="reservation List | Next.js + TypeScript Example">
      <h1>reservation List</h1>
      <p>予約一覧のリスト</p>
      <p>You are currently </p>
      <ul>
        {messages.result.map((message: Message) => (
          <li key={message.id}>{`${message.content}${message.created_at}`}</li>
        ))}
      </ul>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </Layout>
  );
};
export const getServerSideProps = async (ctx: NextPageContext) => {
  const user = JSON.parse(parseCookies(ctx).auth);

  const result: Message[] = await db
    .collection("reservation")
    .where("user_id", "==", user.id)
    .orderBy("created_at")
    .get()
    .then((snapShot) => {
      let messages: Message[] = [];
      snapShot.forEach((doc) => {
        const t: Message = {
          id: doc.id,
          content: doc.data().content,
          created_at: doc.data().created_at.toDate().toString(),
        };
        messages.push(t);
      });
      return messages;
    });
  return { props: { messages: { result } } };
};

export default ListPage;
