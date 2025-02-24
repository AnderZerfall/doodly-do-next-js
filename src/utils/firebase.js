import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const config = {
  apiKey: "AIzaSyC2KeMdktnMFUQEoLqMHMtrISe-nbXRl9M",
  authDomain: "doodly-do.firebaseapp.com",
  projectId: "doodly-do",
  storageBucket: "doodly-do.firebasestorage.app",
  messagingSenderId: "1080883614136",
  appId: "1:1080883614136:web:7897d985698b5e10493f4d",
  measurementId: "G-HZ1HFXJVT7"
};

const app = initializeApp(config);
export const firestore = getFirestore(app);

// if (!firebase.apps.length) {
//     firebase.initializeApp(config);
// }

// export const firestore = firebase.firestore();

