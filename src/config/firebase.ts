import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuIX2sb3hNizV8lyY2ANjFgFj4KruSKx4",
  authDomain: "fitherway-diet-plans.firebaseapp.com",
  projectId: "fitherway-diet-plans",
  storageBucket: "fitherway-diet-plans.appspot.com",
  messagingSenderId: "188487370789",
  appId: "1:188487370789:web:d57002dae08245734357cc",
  measurementId: "G-MKQPPHP980"
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;
