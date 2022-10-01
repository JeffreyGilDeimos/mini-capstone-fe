import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqMbC1vtU3zSXWMFWla7m2hKJP5RfOeG8",
    authDomain: "react-emart-6213c.firebaseapp.com",
    projectId: "react-emart-6213c",
    storageBucket: "react-emart-6213c.appspot.com",
    messagingSenderId: "608379651063",
    appId: "1:608379651063:web:e01f7943be2b7ba41224f2"
  };

  // use this to initialize the firebase app
  const firebaseapp = firebase.initializeApp(firebaseConfig);

  // Use for db
const db = firebaseapp.firestore()
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { db, auth, googleProvider, facebookProvider } 