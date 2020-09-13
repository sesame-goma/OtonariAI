import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ChannelListRow from './ChannelListRow';
import { item } from '../types/youtuber/index';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }),
);

type Props = {
  items: Array<item>,
}


// export default function ChannelList(props: Props) {
export default function ChannelList({items}: Props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {items && items.map((item: item) =>
        <ChannelListRow item={item} key={item.key}/>
      )}
    </List>
  );
}
