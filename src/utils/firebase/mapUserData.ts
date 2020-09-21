import { db } from "./initFirebase";

const getUserFromDB = async (id) => {
  const doc = await db.collection("users").doc(id).get();

  if (!doc.exists) {
    return null;
  } else {
    const d = doc.data();
    return d;
  }
};

/**
 * firebase認証情報からjucy内で使えるユーザーオブジェクトに変換します。
 * Firestoreに情報が入っていれば（サインアップ済）Firestoreの会員情報も加えて返します。
 *
 * @param user firebase auth情報
 * @return {object} サインアップ済ユーザー || 未サインアップ済ユーザー
 */
export const mapUserData = async (user) => {
  const { uid, email, xa } = user;

  const firestoreUser: Object | null = await getUserFromDB(uid);

  if (firestoreUser) {
    return {
      id: uid,
      email,
      token: xa,
      ...firestoreUser,
    };
  }

  return {
    id: uid,
    email,
    token: xa,
  };
};
