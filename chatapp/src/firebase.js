import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCOVu3h6wSIpAgmNl9kqjC7e7EVnEvj9_s",
  authDomain: "chatapp-cc294.firebaseapp.com",
  projectId: "chatapp-cc294",
  storageBucket: "chatapp-cc294.appspot.com",
  messagingSenderId: "611072004460",
  appId: "1:611072004460:web:7d630aac7c5f971244e349",
  measurementId: "G-CGWVS7VZLP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);

export { auth, provider, firestore, app };