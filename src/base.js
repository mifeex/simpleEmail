import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: "AIzaSyAk9YrjyfvDM-4va-X7b-__Y8UwkSOtynE",
  authDomain: "simpleproject-f43d9.firebaseapp.com",
  projectId: "simpleproject-f43d9",
  storageBucket: "simpleproject-f43d9.appspot.com",
  messagingSenderId: "946267297811",
  appId: "1:946267297811:web:c8e7eb2a90b99243ad47e6",
  measurementId: "G-2E6WXX3YWD"
});

export const db = app.firestore();

export const actionCodeSettings = () => {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  let url = `https://simpleproject-f43d9.web.app/goto?user=ub1947`;
  // This must be true.
  let handleCodeInApp = true;
  return {
      url,
      handleCodeInApp
  }
}
export default app;