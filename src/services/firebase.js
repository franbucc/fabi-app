
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBEW_ZcnBIwutVmz3yiLj_bbE-2GIN1bKc",
  authDomain: "fabi-bfa0d.firebaseapp.com",
  databaseURL: "https://fabi-bfa0d-default-rtdb.firebaseio.com",
  projectId: "fabi-bfa0d",
  storageBucket: "fabi-bfa0d.appspot.com",
  messagingSenderId: "179697097862",
  appId: "1:179697097862:web:2b240b8ee3156f0b01c507",
  measurementId: "G-3NNDBC1KE4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
