import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// TODO Add .env.development and .env.production for two different env. Need to create two different projects on firebase
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
};

class Firebase {
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;

  constructor() {
    firebase.initializeApp(config);

    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string) =>
    this.auth.currentUser?.updatePassword(password);

  user = (uid: string) => this.db.collection('users').doc(uid);

  users = () => this.db.collection('users');
}

export default Firebase;
