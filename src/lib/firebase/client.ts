
import {initializeApp, getApp, App} from 'firebase/app';
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: App;
let auth: Auth;
let db: Firestore;

function initializeFirebase() {
    try {
        app = getApp();
    } catch (e) {
        app = initializeApp(firebaseConfig);
    }
    auth = getAuth(app);
    db = getFirestore(app);
}

// Client-side safe initialization
if (typeof window !== 'undefined') {
    initializeFirebase();
}

function getDb() {
    if (!db) {
        initializeFirebase();
    }
    return db;
}

function getAuthInstance() {
    if (!auth) {
        initializeFirebase();
    }
    return auth;
}

export { getDb, getAuthInstance as getAuth };
