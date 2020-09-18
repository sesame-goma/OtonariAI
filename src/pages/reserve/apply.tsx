import Link from "next/link";
import React, { useState } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import Layout from "../../components/Layout";
import initFirebase from "../../utils/firebase/initFirebase";
import { useUser } from "../../utils/firebase/useUser";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Button,
  TextareaAutosize,
  Typography,
  TextField,
} from "@material-ui/core";
import { useRouter } from "next/router";

type Message = {
  content: string;
};
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ApplyPage = () => {
  const db = initFirebase.firestore();
  const [input, setMessage] = useState<Message>({
    content: "",
  });
  const [open, setOpen] = useState(false);

  const { user } = useUser();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const router = useRouter();
  const query = router.query;
  console.log(query);

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
      isChecked: null,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    };
    db.collection("reservation").add(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">メッセージを送信しました</h2>
      <p id="simple-modal-description">ここに細かなメッセージ</p>
      <Button onClick={handleClose}>閉じる</Button>
    </div>
  );
  return (
    <Layout title="Resevation Apply | Next.js + TypeScript Example">
      <Typography variant="h4">予約申し込み</Typography>
      <hr />
      <Typography variant="h6">インフルエンサーの情報</Typography>
      <Typography variant="body1">{`チャンネル名:${query.name}`}</Typography>
      <Typography variant="body1">{`登録者数:${query.subscribe}`}</Typography>
      <Typography variant="body1">{`総再生回数:${query.viewCount}`}</Typography>
      <Typography variant="body1">{`概要:${query.description}`}</Typography>

      <hr />
      <Typography variant="h6">飲食店の入力項目</Typography>
      <TextField id="standard-basic" label="件名" />
      <br />
      <TextareaAutosize
        name="content"
        onChange={onMessageChange}
        placeholder="メッセージ"
        rowsMin={5}
      ></TextareaAutosize>
      <br />
      <Button variant="contained" color="primary" onClick={submitMessage}>
        申し込み
      </Button>
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </Layout>
  );
};

export default ApplyPage;
