import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBlWkldYwSv8-TalmTUGZkwpUsahwucSME",
  authDomain: "porter-and-boat.firebaseapp.com",
  projectId: "porter-and-boat",
  storageBucket: "porter-and-boat.firebasestorage.app",
  messagingSenderId: "836808860920",
  appId: "1:836808860920:web:a31ee78190a48b9464470d",
  measurementId: "G-N9MX4Y1987"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
