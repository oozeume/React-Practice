import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwvUdlz-XDLgiVGFPN8Sr5INst9yR_X-Q",
  authDomain: "image-community-bc8fc.firebaseapp.com",
  projectId: "image-community-bc8fc",
  storageBucket: "image-community-bc8fc.appspot.com",
  messagingSenderId: "218968556407",
  appId: "1:218968556407:web:fea4f2cc94f20d46d35772",
  measurementId: "G-X6SPG0MFDL"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();

export{auth, apiKey, firestore};