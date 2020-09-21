import { useEffect, useState, } from 'react'
import { db } from "../firebase/initFirebase";

const useRegisteredYoutuber = (channelId: number) => {
  const [isRegistered, setIsRegistered] = useState(false)

  useEffect(() => {
    if (!channelId) return;

    db.collection('users')
      .where('channelId', '==', channelId)
      .get()
      .then(snap => {
        if (snap.docs.length) {
          setIsRegistered(true);
        }
      })
  }, [channelId])
  return { isRegistered };
}

export { useRegisteredYoutuber }