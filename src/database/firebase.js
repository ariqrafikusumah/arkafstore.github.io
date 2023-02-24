// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADCIrdgQDoTVv4Vlbs_TilC57WM32l4VM",
  authDomain: "api-arkafstore-ed871.firebaseapp.com",
  databaseURL: "https://api-arkafstore-ed871-default-rtdb.firebaseio.com",
  projectId: "api-arkafstore-ed871",
  storageBucket: "api-arkafstore-ed871.appspot.com",
  messagingSenderId: "347890306685",
  appId: "1:347890306685:web:afce3ec994c21bae78ab14",
  measurementId: "G-3M4V4DTDX1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getDatabase(app);
