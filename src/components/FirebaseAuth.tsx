/* globals window */
import { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
// import firebase from 'firebase/app'
import firebase from '../utils/firebase/initFirebase'
import 'firebase/auth'
import { setUserCookie } from '../utils/firebase/userCookies'
import { mapUserData } from '../utils/firebase/mapUserData'
import Router from 'next/router'
import { User } from '../types/index'

const firebaseAuthConfig = {
  signInFlow: 'popup',
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],

  signInSuccessUrl: '/',

  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: ({ user }: {user: User}) => {
      mapUserData(user).then((userData: any) => {
        setUserCookie(userData);
        // データが入っていない(=未登録)ならサインアップへ飛ばす
        if (!userData.data) {
          ~Router.pathname.indexOf('eatery')
            ? Router.push('/eatery/signup')
            : Router.push('/youtuber/signup')
          return false;
        }
      })
    },
  },
}

const FirebaseAuth = () => {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true)
    }
  }, [])
  return (
    <div>
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
    </div>
  )
}

export default FirebaseAuth
