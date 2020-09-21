import React, { useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Link from "../components/link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import { item } from "../types/youtuber/index";
import { GlobalProvider, GlobalContext } from "../utils/context/context";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      "&:hover": {
        backgroundColor: theme.palette.grey[50],
      },
    },
    inline: {
      display: "inline",
    },
    divider: {
      paddingTop: 0,
      marginBottom: 10,
    },
    nested: {
      marginLeft: 50,
    },
    listRow: {
      paddingBottom: 10,
    },
    button: {
      marginTop: 10,
      marginLeft: 16,
    },
  })
);

type Props = {
  item: item;
};

export default function ChannelListRow(item) {
  const classes = useStyles();
  //   const onPress = () => {
  //     Router.push({
  //       pathname: "/reserve/apply",
  //       query: {
  //         id: item.id,
  //       },
  //     });
  //   };

  const router = useRouter();
  const handleClick = () => {};
  const onPress = () => {
    Router.push({
      pathname: "/reserve/apply",
      query: {
        id: item.id,
      },
    });
  };
  return (
    <div className={classes.container} key={item.key}>
      <Divider component="li" className={classes.divider} />
      <div className={classes.listRow}>
        <Link
          href={`/analytics/${item.item.snippet.channelId}`}
          underline="none"
          color="inherit"
        >
          <ListItem alignItems="flex-start">
            {/* <ListItem alignItems="flex-start" button onClick={handleClick}> */}
            <ListItemAvatar>
              <img
                src={item.item.snippet.thumbnails.default.url}
                style={{ width: "100%" }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={item.item.snippet.title}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {item.item.snippet.channelTitle}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </Link>
      </div>
    </div>
  );
}
