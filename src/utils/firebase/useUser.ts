import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// import firebase from 'firebase/app'
// import 'firebase/firestore'
import firebase, { db } from './initFirebase'
import * as admin from 'firebase-admin'
import 'firebase/auth'
import initFirebase from './initFirebase'
// import { initFbAdmin } from './firebaseAdmin'
// import * as admin from 'firebase-admin'
// import { useCollection, useDocument } from 'react-firebase-hooks'
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie,
} from './userCookies'
import { mapUserData } from './mapUserData'

const useUser = () => {
  const [user, setUser] = useState()
  const router = useRouter()

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        router.push('/login')
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const getUserFromDB = (id) => {
    let data;

    // const db = firebase.firestore();
    db.collection('users')
      .where('f_uid', '==', id)
      .get()
      .then(snapShot => {
        console.log(snapShot.docs[0].data())
        data = snapShot.docs[0].data();
      })

    console.log(data)
    return data;
  }

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener = firebase.auth().onIdTokenChanged((user) => {
      if (user) {
        const userData = mapUserData(user)

        const firestoreUser = getUserFromDB(userData.id);
        // const firestoreUser = getUserFromDB("aaa");
        console.log('userData',userData)
        console.log('firestoreUser',firestoreUser);

        setUserCookie(userData)
        setUser(userData)
      } else {
        removeUserCookie()
        setUser()
      }
    })

    const userFromCookie = getUserFromCookie()
    if (!userFromCookie) {
      router.push('/')
      return
    }
    setUser(userFromCookie)

    return () => {
      cancelAuthListener()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { user, logout }
}

export { useUser }
