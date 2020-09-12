
import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    inline: {
      display: 'inline',
    },
    divider: {
      marginTop: 10,
      marginBottom: 10,
    },
    nested: {
      marginLeft: 50,
    }
  }),
);

type item = {
  key: number;
  title: string;
  thumbnail: string;
  description: string;
}

export default function ChannelListRow({ item }: item) {
  const classes = useStyles();
  return (
    <React.Fragment key={item.key}>
      <Divider component="li" className={classes.divider}/>
      <ListItem alignItems="flex-start">
      {/* <ListItem alignItems="flex-start" button onClick={handleClick}> */}
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={item.thumbnail} />
        </ListItemAvatar>
        <ListItemText
          primary={item.title}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {item.description}
              </Typography>
            </React.Fragment>
          }
        />
      {/* {open ? <ExpandLess /> : <ExpandMore />} */}
      </ListItem>
      {/* <Collapse in={open} timeout="auto" unmountOnExit> */}
        <List component="div" disablePadding>
          <ListItem className={classes.nested}>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary={`総視聴回数: ${parseInt(item.viewCount).toLocaleString()}回`} />
          </ListItem>
          <ListItem className={classes.nested}>
            <ListItemIcon>
              <SubscriptionsIcon />
            </ListItemIcon>
            <ListItemText primary={`チャンネル登録者数: ${parseInt(item.subscriberCount).toLocaleString()}人`} />
          </ListItem>
        </List>
      {/* </Collapse> */}
    </React.Fragment>
  );
}
