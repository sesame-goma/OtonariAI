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
        .where("eateryId", "==", "h2ghYg4GUxR7xdoPNP2DjNTrkJl2")
        // .orderBy("created_at")
        .get()
        .then((snapShot) => {
          let messages: Message[] = [];
          snapShot.forEach((doc) => {
            console.log("testing");
            const content = doc.data().content;
            // const create = doc.data().created_at.toDate().toString();
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
            console.log(messages);
          });
        });
    }
  }, [user]);

  return (
    <Layout title="reservation List | Next.js + TypeScript Example">
      <h1>youtuberへの予約申し込み一覧</h1>

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
                  {message.youtuberName}
                </Typography>
                <Typography>{message.content} </Typography>

                {message.processed ? (
                  <Typography
                    component="span"
                    variant="body2"
                    style={{ display: "block" }}
                    color="textSecondary"
                  >
                    対応済み
                  </Typography>
                ) : (
                  <Typography
                    component="span"
                    variant="body2"
                    style={{ display: "block" }}
                    color="textSecondary"
                  >
                    返信待ち
                  </Typography>
                )}
                {message.reservedAt}
                <Typography>youtubeへのリンク</Typography>
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
