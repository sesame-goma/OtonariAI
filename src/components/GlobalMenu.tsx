import React, { Component, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from '../components/Link';
import { useUser } from '../utils/firebase/useUser';

export default function GlobalMenu() {
  const { user, logout } = useUser();

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
              <div style={{margin: '0 0 0 auto'}}>
                <Button variant="contained" color="secondary" onClick={() => logout()}>
                  ログアウト
                </Button>
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
                    インフルエンサー様ログイン
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
