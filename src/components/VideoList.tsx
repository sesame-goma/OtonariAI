import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import VideosListRow from "./VideoListRow";
import { item } from "../types/youtuber/index";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
  })
);

type Props = {
  items: Array<item>;
};

export default function VideosList({ items }: Props) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {items &&
        Array.isArray(items) &&
        items.map((item: item) => <VideosListRow item={item} />)}
    </List>
  );
}
