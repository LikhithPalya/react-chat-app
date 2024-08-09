import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getStorage } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'
// import {VITE_API_KEY} from '.env' 

const firebaseConfig = {
  apiKey: "AIzaSyDX5WfBCmCMhHgyQh-e5Ny756QlZe5X6dA" ,
  authDomain: "chat2-3e41e.firebaseapp.com",
  projectId: "chat2-3e41e",
  storageBucket: "chat2-3e41e.appspot.com",
  messagingSenderId: "829095542475",
  appId: "1:829095542475:web:9470b998a6df5af5d3a54e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();