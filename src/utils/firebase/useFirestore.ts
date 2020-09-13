// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import firebase from 'firebase/app'
// import * as admin from 'firebase-admin'
// import { mapUserData } from './mapUserData'

// const useFirestore = (id) => {
//   const [db, setDb] = useState();

//   const fetchUserOne = (id: number) => {
//     let usersRef = db.collection('users');
//     let query = usersRef.where('f_uid',  '==', id).get();
//       .then(snapshot => {
//         if(snapshot.empty) {
//           console.log('No matching documents.');
//         }

//         snapshot.forEach(doc => {
//           console.log(doc.id, '=>', doc.data());
//         })
//         .catch(err => {
//           console.log('Error getting documents', err);
//         });
//       });
//   }

//   useEffect(() => {
//     const fs = admin.firestore();
//     setDb(fs);

//   })
// }