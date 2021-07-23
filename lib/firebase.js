// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtJ_jG_futEdDutSz9ppUD_t5dxdoCXuU",
  authDomain: "medivery-69439.firebaseapp.com",
  projectId: "medivery-69439",
  storageBucket: "medivery-69439.appspot.com",
  messagingSenderId: "383245309230",
  appId: "1:383245309230:web:d9145f4cb4af50b22656bf",
};
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
export const fireDb = firebase.firestore();
export const fireAuth = firebase.auth();
