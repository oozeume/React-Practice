import firebase from 'firebase/app';
import "firebase/firestore";

const firebaseConfig = {
    // 여기에 들어가는 건 대시보드에 넣을 config 정보
    apiKey: "AIzaSyBLTtKPw14FzVYwHmc3tE7cRh_NS4thM2s",
    authDomain: "mydictionary-e5896.firebaseapp.com",
    projectId: "mydictionary-e5896",
    storageBucket: "mydictionary-e5896.appspot.com",
    messagingSenderId: "574475620413",
    appId: "1:574475620413:web:060dad04ec4bdce91d9a54",
    measurementId: "G-WDXB71Y1ZL"
};

//firebaseConfig라는 거로 App을 초기화
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };