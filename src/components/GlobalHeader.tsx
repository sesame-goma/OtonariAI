/*---- 外部インポート ----*/
import React, { useState } from "react";
import {
  createStyles,
  Theme,
  makeStyles
} from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Badge,
} from '@material-ui/core';
import Link from "../components/Link";
import { useUser } from "../utils/firebase/useUser";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useRouter } from "next/router";
import { useReserveCount } from "../utils/hooks/useReserveCount";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      display: 'flex',
      backgroundColor: '#1b1b1b',
    },
  })
)

export default function GlobalHeader() {
  const classes = useStyles();
  const { user, logout } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { count } = useReserveCount(user);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
      <AppBar position="fixed" color="inherit">
        <Toolbar className={classes.appBar}>
          {(() => {
            if (user) {
              return (
                <div style={{ marginLeft: "auto" }}>
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
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        user.type === "eatery"
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
                        logout();
                        handleClose();
                      }}
                    >
                      ログアウト
                    </MenuItem>
                  </Menu>
                </div>
              );
            } else {
              return (
                <div style={{ display: "flex", margin: "0 0 0 auto" }}>
                  <Link href="/youtuber/login">
                    <Button
                      variant="contained"
                      color="secondary"
                    >
                      ログイン
                    </Button>
                  </Link>
                </div>
              );
            }
          })()}
        </Toolbar>
      </AppBar>
  );
}
