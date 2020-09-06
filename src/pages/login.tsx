// import Link from 'next/link'
// import Layout from '../components/Layout'
// import FirebaseAuth from '../components/FirebaseAuth'

// const LoginPage = () => (
//   <Layout title="Login | Next.js + TypeScript Example">
//     <h1>Login 🗝</h1>
//     <div>
//       <FirebaseAuth />
//     </div>
//     <p>
//       <Link href="/">
//         <a>home</a>
//       </Link>
//     </p>
//   </Layout>
// )

// export default LoginPage

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FirebaseAuth from '../components/FirebaseAuth'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginPage() {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        ログイン
      </Typography>
      <FirebaseAuth />
    </div>
  );
}
