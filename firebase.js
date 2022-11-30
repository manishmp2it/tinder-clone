import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBq9Lrlze_raNaigNtCkJxCy5TyUJxFXNQ",
  authDomain: "tinder-5704e.firebaseapp.com",
  projectId: "tinder-5704e",
  storageBucket: "tinder-5704e.appspot.com",
  messagingSenderId: "953808248579",
  appId: "1:953808248579:web:ddf091638693cecd0bd336"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();
const db=getFirestore();

export {app,db}