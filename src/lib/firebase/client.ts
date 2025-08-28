import {initializeApp, getApp, getApps} from 'firebase/app';

const firebaseConfig = {
  projectId: "sasha-ai-crm",
  appId: "1:1010023978468:web:19698e410269d1a85ba3f1",
  storageBucket: "sasha-ai-crm.firebasestorage.app",
  apiKey: "AIzaSyAlDw7wjxI6Jd1F-cbcdLWjn36fo7kYVb0",
  authDomain: "sasha-ai-crm.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "1010023978468"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export {app};
