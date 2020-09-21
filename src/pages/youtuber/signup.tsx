import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "../../components/Link";
import useFormInput from "../../utils/hooks/useFormInput";
import { db } from "../../utils/firebase/initFirebase";
import { useUser } from "../../utils/firebase/useUser";
// import { useRouter } from 'next/router'
import Router from "next/router";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpPage() {
  const name = useFormInput("");
  const channelIdInput = useFormInput("");
  const classes = useStyles();
  const { user } = useUser();

  const submit = () => {
    db.collection("users")
      .doc(user.id)
      .set({
        name: name.value,
        type: "youtuber",
        channelId: channelIdInput.value,
      })
      .then((e) => {
        Router.push('/?type=success&message=ログインしました');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        サインアップ
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              autoComplete="fname"
              name="name"
              variant="outlined"
              required
              fullWidth
              id="name"
              label="名前"
              autoFocus
              {...name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="fname"
              name="channel"
              variant="outlined"
              required
              fullWidth
              id="channel"
              label="チャンネルID"
              autoFocus
              {...channelIdInput}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={submit}
          style={{textAlign: 'center'}}
        >
          サインアップ
        </Button>
      </form>
    </div>
  );
}
