import firebaseConfig from "./config/firebase.config";

import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";

// const firebaseApp = initializeApp(firebaseConfig)
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore(firebaseApp);


export { auth, db };