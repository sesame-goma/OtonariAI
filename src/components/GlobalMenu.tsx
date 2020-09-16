import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Link from '../components/Link';
import Search from './Search';

const styles = {
  list: {
    width: 250,
  },
  root: {
    flexGrow: 1,
    marginBottom: 80,
  },
  appBar: {
    boxShadow: 'none',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};
class GlobalMenu extends Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render () {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <Link href="/">
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link href="/about">
            <ListItem button>
              <ListItemText primary="About" />
            </ListItem>
          </Link>
          <Link href="/analytics">
            <ListItem button>
              <ListItemText primary="Analytics" />
            </ListItem>
          </Link>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="fixed" color="default">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
              <MenuIcon />
            </IconButton>
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false)}
                onKeyDown={this.toggleDrawer('left', false)}
              >
                {sideList}
              </div>
            </Drawer>
            <Link href="/" >
              <img src="/logo_sm.png" style={{height: 30, marginTop: 10, marginBottom: 5}}/>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

GlobalMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GlobalMenu);
