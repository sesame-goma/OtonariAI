
import { useEffect, useState, } from 'react'
import YoutuberIndex from '../../pages/youtuber';
import { db } from "../firebase/initFirebase";

const useReserveCount = (user) => {
  const [count, setCount] = useState()

  useEffect(() => {
    if (!user || user.type == 'eatery') return;

    db.collection('reservation')
      .where('youtuberId', '==', user.channelId)
      .where('processed', '==', false)
      .get()
      .then(snap => {
        setCount(snap.docs.length);
      })
  }, [user])
  return { count };
}

export { useReserveCount }