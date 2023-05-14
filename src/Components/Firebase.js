import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDmUt0hG_HpmxqBSc2UKbthc0G1ltV_U0o",
    authDomain: "where-is-waldo-480cb.firebaseapp.com",
    projectId: "where-is-waldo-480cb",
    storageBucket: "where-is-waldo-480cb.appspot.com",
    messagingSenderId: "1096433498602",
    appId: "1:1096433498602:web:646cc593e4db04f00cda93"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default firebase;