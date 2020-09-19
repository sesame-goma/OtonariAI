import Link from "next/link";
import React, { useState } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import Avatar from "@material-ui/core/Avatar";
import Layout from "../../components/Layout";
import Paper from "@material-ui/core/Paper";
import initFirebase from "../../utils/firebase/initFirebase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { useChannel } from "../../utils/hooks/useChannel";
import { useUser } from "../../utils/firebase/useUser";
import { makeStyles } from "@material-ui/core/styles";
import useFormInput from "../../utils/hooks/useFormInput";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import { Message } from "../../types/index";

import useSWR from "swr";
import {
  Modal,
  Button,
  TextareaAutosize,
  Typography,
  TextField,
} from "@material-ui/core";
import Router, { useRouter } from "next/router";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import { QueryBuilder } from "@material-ui/icons";

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
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    marginBottom: 5,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formContainer: {
    marginTop: 30,
  },
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
}));

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json" }),
  }).then((res) => res.json());

const ApplyPage = () => {
  const db = initFirebase.firestore();

  // フォーム
  const title = useFormInput("");
  const content = useFormInput("");
  const address = useFormInput("");

  // モーダル
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);

  const { user } = useUser();
  const classes = useStyles();

  const router = useRouter();

  // チャンネル情報
  const { data, error } = useSWR(
    `https://www.googleapis.com/youtube/v3/channels?key=${process.env.YOUTUBE_API_KEY}&id=${router.query.id}&part=id,snippet,statistics&maxResults=1&regionCode=jp`,
    fetcher
  );

  const submitMessage = () => {
    // 後々のundefチェックをマジでやりたくないので全部必須項目にしたろｗ
    if (title.value === "" || content.value === "" || address.value === "")
      return;

    const data = {
      title: title.value,
      content: content.value,
      address: address.value,
      eateryId: user.id,
      eateryName: user.data.name,
      youtuberId: router.query.id,
      processed: false,
      reservedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    db.collection("reservation").add(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    Router.push("/youtuber");
  };

  const body = (
    <div style={modalStyle} className={classes.modal}>
      <Avatar className={classes.avatar} style={{ margin: "auto" }}>
        <CheckOutlinedIcon />
      </Avatar>
      <h2 id="simple-modal-title">メッセージを送信しました</h2>
      <p id="simple-modal-description">
        インフルエンサーからの返信をお待ち下さい。
      </p>
      <Button variant="contained" onClick={handleClose}>
        閉じる
      </Button>
    </div>
  );

  return (
    <Layout title="Resevation Apply | Next.js + TypeScript Example">
      {console.log("data", data)}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <DateRangeOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5" className={classes.title}>
          食レポを依頼する
        </Typography>

        {data && data.items.length !== -1 && (
          <Paper>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    alt="channel"
                    src={data.items[0].snippet.thumbnails.default.url}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={data.items[0].snippet.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                        style={{ display: "block" }}
                      >
                        {`チャンネル登録者数 ${data.items[0].statistics.subscriberCount} 人`}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        style={{ display: "block" }}
                        color="textSecondary"
                      >
                        {`総視聴回数 ${data.items[0].statistics.viewCount} 回`}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Paper>
        )}

        <hr />
        <div className={classes.formContainer}>
          <Typography variant="h6">依頼フォーム</Typography>
          <TextField
            id="standard-basic"
            label="件名"
            fullWidth
            required
            style={{ marginBottom: 15 }}
            {...title}
          />
          <TextField
            id="standard-basic"
            label="連絡先メールアドレス"
            fullWidth
            required
            style={{ marginBottom: 15 }}
            {...address}
          />
          <TextField
            id="standard-multiline-static"
            label="依頼内容"
            multiline
            rows={4}
            fullWidth
            required
            style={{ marginBottom: 15 }}
            {...content}
          />
          <div style={{ textAlign: "center" }}>
            <Button variant="contained" color="primary" onClick={submitMessage}>
              申し込み
            </Button>
          </div>
        </div>
      </div>
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
