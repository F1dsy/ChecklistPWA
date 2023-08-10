// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB25DtOduAOu77WBHOsMkSAkG77DX1zINU",
  authDomain: "checklist-df738.firebaseapp.com",
  projectId: "checklist-df738",
  storageBucket: "checklist-df738.appspot.com",
  messagingSenderId: "278440722920",
  appId: "1:278440722920:web:14d0886a65f15a2bbca45d",
  measurementId: "G-3WH51CSP07",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
