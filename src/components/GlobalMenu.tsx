import React, { Component, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Link from '../components/Link';
import { useUser } from '../utils/firebase/useUser';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';
import { useRouter } from 'next/router'
import { useReserveCount } from '../utils/hooks/useReserveCount';

export default function GlobalMenu() {
  const { user, logout } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { count } = useReserveCount(user);
  console.log('count',count);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="relative" color="inherit">
        <Toolbar style={{display: 'flex'}}>
          <Link href="/" >
            <img src="/logo_sm.png" style={{height: 30, marginTop: 10, marginBottom: 5}}/>
          </Link>

          {(() => {
          if (user) {
            return (
              <div style={{marginLeft: 'auto'}}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Badge color="primary" badgeContent={count || 0}>
                    <AccountCircle />
                  </Badge>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                    <MenuItem
                      onClick={() => {
                        user.type === 'eatery'
                          ? router.push("/eatery/reserve")
                          : router.push("/youtuber/reserve");
                        handleClose();
                      }}
                    >
                      <Badge color="primary" variant="dot" invisible={!count}>
                        予約一覧
                      </Badge>
                    </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout()
                      handleClose()
                    }}
                  >
                    ログアウト
                  </MenuItem>
                </Menu>
              </div>
            )
          } else {
            return (
              <div style={{display: 'flex', margin: '0 0 0 auto'}}>
                <Link style={{paddingRight: '10px'}} href="/eatery/login">
                  <Button variant="contained" color="secondary" disableElevation>
                    飲食店様ログイン
                  </Button>
                </Link>
                <Link href="/youtuber/login" color="secondary">
                  <Button variant="contained" color="primary" disableElevation>
                    Youtuberログイン
                  </Button>
                </Link>
              </div>
            )
          };
          })()}
        </Toolbar>
      </AppBar>
    </div>
  );
}
