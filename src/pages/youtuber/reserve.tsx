import React from "react";
import * as R from "ramda";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import "firebase/firestore";
import { db } from "../../utils/firebase/initFirebase";
import { useUser } from "../../utils/firebase/useUser";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  List,
  ListItemText,
  ListItemAvatar,
  ListItem,
  Typography,
  Avatar,
  Container,
  Box,
  Divider,
} from "@material-ui/core";

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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  mainContainer: {
    // borderStyle: 'solid',
    // borderWidth: 3,
    // borderColor: 'lightBlue',

    padding: 20,
  },
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
}));

const ListRow = (data) => {
  const { message, onPress } = data;

  return (
    <List alignItems="flex-start">
      <ListItem>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItem>
          <Typography color="textPrimary" style={{marginRight: 'auto'}}>
            {message.eateryName}
          </Typography>
          <Typography color="textSecondary" style={{marginLeft: 'auto'}}>
            {`依頼日: ${message.reservedAt}`}
          </Typography>
        </ListItem>
      </ListItem>
      <ListItem>
        <Typography>{`連絡先: ${message.address}`}</Typography>
      </ListItem>
      <ListItem>
        <Typography>{`タイトル: ${message.title}`}</Typography>
      </ListItem>
      <ListItem>
        <Typography>{`依頼内容: ${message.content}`}</Typography>
      </ListItem>
      <ListItem>
        <Button
          variant="contained"
          color={message.processed ? "primary" : "secondary"}
          onClick={() => onPress(message.processed, message.id)}
        >
          {message.processed ? "未対応に変更" : "対応済みに変更"}
        </Button>
      </ListItem>
    </List>
  );
};

const ListPage = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (user) {
      setMessages([]);
      db.collection("reservation")
        .where("youtuberId", "==", user.channelId)
        .orderBy("reservedAt")
        .get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
            const date = doc.data().reservedAt.toDate();
            const formatDate = `
            ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
              .replace(/\n|\r/g, "");

            setMessages((messages) =>
              messages.concat({
                id: doc.id,
                title: doc.data().title,
                content: doc.data().content,
                address: doc.data().address,
                eateryId: doc.data().eateryId,
                eateryName: doc.data().eateryName,
                youtuberId: doc.data().youtuberId,
                youtuberName: doc.data().youtuberName,
                processed: doc.data().processed,
                reservedAt: formatDate,
              })
            );
          });
        });
    }
  }, [user]);

  const onPress = async (button: boolean, id: string) => {
    const reservationRef = db.collection("reservation").doc(id);
    const res = await reservationRef.update({ processed: button });
    const result = messages.findIndex((v) => v.id === id);
    const newMessages = R.clone(messages);
    newMessages[result].processed = !button;
    setMessages(newMessages);
  };

  return (
    <Container maxWidth="md">
      <Layout title="予約一覧">
        <div className={classes.mainContainer}>
          <Typography variant="h6" component="h1" gutterBottom>
            食レポ依頼一覧{" "}
          </Typography>
          {messages.map((message) => (
            <div>
              <ListRow
                message={message}
                onPress={(processed, id) => onPress(processed, id)}
              />
              <Divider />
            </div>
          ))}
        </div>
      </Layout>
    </Container>
  );
};

export default ListPage;
