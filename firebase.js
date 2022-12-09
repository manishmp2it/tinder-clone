import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getReactNativePersistence, initializeAuth} from "firebase/auth/react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBq9Lrlze_raNaigNtCkJxCy5TyUJxFXNQ",
  authDomain: "tinder-5704e.firebaseapp.com",
  projectId: "tinder-5704e",
  storageBucket: "tinder-5704e.appspot.com",
  messagingSenderId: "953808248579",
  appId: "1:953808248579:web:ddf091638693cecd0bd336"
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);

const auth1 = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const auth=getAuth(app);

const db=getFirestore();

export {db,auth,app}