import Link from "next/link";
import React, { useState } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import Layout from "../../components/Layout";
import initFirebase from "../../utils/firebase/initFirebase";
import { getUserFromCookie } from "../../utils/firebase/userCookies";

type Message = {
  content: string;
};

const ApplyPage = () => {
  const db = initFirebase.firestore();
  const [input, setMessage] = useState<Message>({
    content: "",
  });

  const user = getUserFromCookie();

  const onMessageChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLImputElement>) => {
    setMessage((prev) => ({ ...prev, [name]: value }));
  };

  const submitMessage = () => {
    if (input.content === "") return;
    const data = {
      content: input.content,
      user_id: user.id,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    };
    db.collection("reservation").add(data);
  };

  return (
    <Layout title="Resevation Apply | Next.js + TypeScript Example">
      <h1>予約申し込み</h1>
      <p>インフルエンサーの情報</p>
      <p>飲食店の入力項目</p>
      <p>
        <input type="text" name="content" onChange={onMessageChange}></input>
      </p>
      <button onClick={submitMessage}>申し込み</button>
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  );
};

export default ApplyPage;
