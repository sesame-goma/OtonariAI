import React from "react";
import R from "ramda";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import "firebase/firestore";
import { db } from "../../utils/firebase/initFirebase";
import { Message } from "../../types/index";
import { useUser } from "../../utils/firebase/useUser";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  ListItemText,
  ListItemAvatar,
  List,
  ListItem,
  Typography,
  Divider,
  Avatar,
  Tabs,
  Tab,
  AppBar,
  Box,
} from "@material-ui/core";
import Router from "next/router";

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
}));
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const ListPage = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (user) {
      db.collection("reservation")
        .where("youtuberId", "==", user.channelId)
        .orderBy("reservedAt")
        .get()
        .then((snapShot) => {
          let messages: any[] = [];
          snapShot.forEach((doc) => {
            console.log(doc);
            messages.push({
              id: doc.id,
              title: doc.data().title,
              content: doc.data().content,
              address: doc.data().address,
              eateryId: doc.data().eateryId,
              eateryName: doc.data().eateryName,
              youtuberId: doc.data().youtuberId,
              youtuberName: doc.data().youtuberName,
              processed: doc.data().processed,
              reservedAt: doc.data().reservedAt.toDate().toString(),
            });
            setMessages(messages);
            console.log("testing");
          });
        });
    }
  }, [user]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onPress = async (button: boolean, id: string) => {
    const reservationRef = db.collection("reservation").doc(id);
    const res = await reservationRef.update({ processed: button });
    const result = messages.findIndex((v) => v.id === id);
    messages[result].processed = button;
    setMessages(messages);
  };

  return (
    <Layout title="reservation List | Next.js + TypeScript Example">
      <h1>飲食店からの予約申し込み一覧</h1>

      {messages.map((message) => (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={message.title}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  // className={classes.inline}
                  color="textPrimary"
                >
                  {message.eateryName}
                </Typography>
                <Typography>{message.content}</Typography>

                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onPress(!message.processed, message.id)}
                  >
                    {message.processed ? "未対応に変更" : "対応済みに変更"}
                  </Button>
                </div>

                {message.reservedAt}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
      <Link href="/">
        <a>Go home</a>
      </Link>
    </Layout>
  );
};

export default ListPage;
