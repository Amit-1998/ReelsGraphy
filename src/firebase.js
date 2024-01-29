import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

// With version 9 things changed a bit for importing firebase, but there is no need to downgrade to a previous version, there is a "compatibility" option so can use the /compat folder in your imports, like this

const firebaseConfig = {
  apiKey: "AIzaSyCkdqKK7T1rT6K2fU3tUBZHsEBAuHdf6tA",
  authDomain: "reelsgraphy-79420.firebaseapp.com",
  projectId: "reelsgraphy-79420",
  storageBucket: "reelsgraphy-79420.appspot.com",
  messagingSenderId: "39058055851",
  appId: "1:39058055851:web:a4312e5aaf72cd58540dee"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = {
  users: firestore.collection('users'),
  posts: firestore.collection('posts'),
  comments: firestore.collection('comments'),
  getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();
export default firebase;