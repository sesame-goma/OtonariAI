import { useEffect, useState, } from 'react'
import { db } from "../firebase/initFirebase";

const useRegisteredYoutuber = (id: number) => {
  const [youtuber, setYoutuber] = useState()

  useEffect(() => {
    if (!id) return;

    db.collection('users')
      .where('channelId', '==', channelId)
      .get()
      .then(snap => {
        setYoutuber(snap.docs);
      })
  }, [youtuber])
  return { youtuber };
}

export { useRegisteredYoutuber }