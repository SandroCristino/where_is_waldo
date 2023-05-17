import "firebase/auth";
import "firebase/firestore";
import 'firebase/database' 
import {getDatabase} from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDmUt0hG_HpmxqBSc2UKbthc0G1ltV_U0o",
    authDomain: "where-is-waldo-480cb.firebaseapp.com",
    projectId: "where-is-waldo-480cb",
    storageBucket: "where-is-waldo-480cb.appspot.com",
    messagingSenderId: "1096433498602",
    appId: "1:1096433498602:web:646cc593e4db04f00cda93",
    databaseURL: 'https://where-is-waldo-480cb-default-rtdb.europe-west1.firebasedatabase.app'
};



const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)



