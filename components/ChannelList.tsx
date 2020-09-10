import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ChannelListRow from './ChannelListRow';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }),
);

type item = {
  key: number;
  title: string;
  thumbnail: string;
  description: string;
}
type items = Array<item>;


export default function ChannelList({ items }: items) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      { items.map((item: item) =>
        <ChannelListRow item={item} />
      )}
    </List>
  );
}
