import React from "react";
import R from "ramda";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import "firebase/firestore";
import { db } from "../../utils/firebase/initFirebase";
import { Message } from "../../types/index";
import { useUser } from "../../utils/firebase/useUser";
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
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

  const [okMessages, setOkMessages] = useState([]);
  const [ngMessages, setNgMessages] = useState([]);
  const [undecidedMessages, setUndecidedMessages] = useState([]);

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (user) {
      db.collection("reservation")
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
              isChecked: doc.data().isChecked,
              created_at: create,
            });
            setMessages({ ...messages });
          });
        });

      db.collection("reservation")
        .where("user_id", "==", user.id)
        .where("isChecked", "==", true)
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
              isChecked: doc.data().isChecked,
              created_at: create,
            });
            setOkMessages({ ...messages });
          });
        });
      db.collection("reservation")
        .where("user_id", "==", user.id)
        .where("isChecked", "==", false)
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
              isChecked: doc.data().isChecked,
              created_at: create,
            });
            setNgMessages({ ...messages });
          });
        });
      db.collection("reservation")
        .where("user_id", "==", user.id)
        .where("isChecked", "==", null)
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
              isChecked: doc.data().isChecked,
              created_at: create,
            });
            setUndecidedMessages({ ...messages });
          });
        });
    }
  }, [user]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //onpress
  const onClick = async (button: boolean, key: string) => {
    const reservationRef = db
      .collection("reservation")
      .doc(undecidedMessages[key]["id"]);
    const res = await reservationRef.update({ isChecked: button });

    if (button) {
      const x = Object.keys(okMessages).length + 1;
      undecidedMessages[key]["isChecked"] = button;
      Object.assign(okMessages, { x: undecidedMessages[key] });
      setOkMessages({ ...okMessages });
    } else {
      const x = Object.keys(okMessages).length + 1;
      undecidedMessages[key]["isChecked"] = false;
      Object.assign(ngMessages, { x: undecidedMessages[key] });
      setNgMessages({ ...ngMessages });
    }
    undecidedMessages[key]["isChecked"] = button;
    setUndecidedMessages({ ...undecidedMessages });
  };

  if (!Object.keys(okMessages).length) {
    return <p>loading</p>;
  }

  return (
    <Layout title="reservation List | Next.js + TypeScript Example">
      <h1>予約一覧のリスト</h1>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="許可済み" />
        <Tab label="申請中" />
        <Tab label="断られたもの" />
      </Tabs>
      <TabPanel value={value} index={0}>
        {Object.keys(okMessages).map((key) => (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="タイトル"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    // className={classes.inline}
                    color="textPrimary"
                  >
                    飲食店名
                  </Typography>
                  {okMessages[key]["content"]}

                  {user.data.type == "youtuber" &&
                    okMessages[key]["isChecked"] == null && (
                      <div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => onClick(true, key)}
                        >
                          OK
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => onClick(false, key)}
                        >
                          NG
                        </Button>
                      </div>
                    )}

                  {okMessages[key]["created_at"]}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {Object.keys(undecidedMessages).map((key) => (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="タイトル"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    // className={classes.inline}
                    color="textPrimary"
                  >
                    飲食店名
                  </Typography>
                  {undecidedMessages[key]["content"]}

                  {user.data.type == "youtuber" &&
                    undecidedMessages[key]["isChecked"] == null && (
                      <div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => onClick(true, key)}
                        >
                          OK
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => onClick(false, key)}
                        >
                          NG
                        </Button>
                      </div>
                    )}

                  {undecidedMessages[key]["created_at"]}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {Object.keys(ngMessages).map((key) => (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="タイトル"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    // className={classes.inline}
                    color="textPrimary"
                  >
                    飲食店名
                  </Typography>
                  {ngMessages[key]["content"]}

                  {user.data.type == "youtuber" &&
                    ngMessages[key]["isChecked"] == null && (
                      <div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => onClick(true, key)}
                        >
                          OK
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => onClick(false, key)}
                        >
                          NG
                        </Button>
                      </div>
                    )}

                  {ngMessages[key]["created_at"]}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </TabPanel>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </Layout>
  );
};

export default ListPage;
