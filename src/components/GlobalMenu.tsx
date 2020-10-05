/*---- 外部インポート ----*/
import React from 'react';
import Router from 'next/router';
import {
  createStyles,
  Theme,
  makeStyles
} from '@material-ui/core/styles';
import {
  Collapse,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';


import {
  AccountCircle,
  YouTube,
  Instagram,
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // MenuItems
    nested: {
      paddingLeft: theme.spacing(4),
      color: 'white',
    },
    listItem: {
      color: 'white',
    },
    listItemIcon: {
      color: 'white',
      minWidth: 35,
    },
    // GlobalMenu
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      zIndex: 1000,
      width: drawerWidth,
      backgroundColor: '#424242',
    },
    headerSpacer: {
      height: 64,
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }),
);

type MenuListProps = {
  parentItem: {icon: any, text: string},
  childItems: Array<{text: string, route: string}>
};
const MenuList = ({parentItem, childItems}: MenuListProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  return (
    <List>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemIcon className={classes.listItemIcon}>
          {parentItem.icon}
        </ListItemIcon>
        <ListItemText primary={parentItem.text} className={classes.listItem} />
        {open ? <ExpandLess className={classes.listItem} /> : <ExpandMore className={classes.listItem} />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {childItems.map((item, index) => (
            <ListItem
              button
              key={index}
              className={classes.nested}
              onClick={() => Router.push(item.route)}
            >
              <ListItemText primary={item.text} className={classes.listItem}/>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  )
}

export default function GlobalMenu() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.headerSpacer} />
        <div className={classes.toolbar}>
          <List>
          <ListItem className={classes.listItem}>
              <ListItemIcon className={classes.listItemIcon} >
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="ユーザー名" className={classes.listItem}/>
            </ListItem>
          </List>
        </div>
        <Divider />
        <MenuList
          parentItem={{icon: <YouTube />, text: 'Youtuber検索'}}
          childItems={[{text: 'チャンネル検索', route: '/youtuber'}, {text: '動画検索', route: '/youtuber/video'}]}
        />
        <Divider />
        <MenuList
          parentItem={{icon: <Instagram />, text: 'Instagramer検索'}}
          childItems={[]}
        />
      </Drawer>
    </div>
  );
}