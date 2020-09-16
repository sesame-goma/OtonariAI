
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Link from '../components/link'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import { item } from '../types/youtuber/index';


const useStyles = makeStyles(() =>
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

type Props = {
  item: item,
  key: number,
}

export default function ChannelListRow({item}: Props) {
  const classes = useStyles();
  return (
    <React.Fragment key={item.key}>
      <Link href="/analytics" underline="none" color="inherit">
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
      </Link>
    </React.Fragment>
  );
}
