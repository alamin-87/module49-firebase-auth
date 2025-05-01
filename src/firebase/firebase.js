// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4UtAwLA1rECjnuLui28vx7-rF5vQaCKc",
  authDomain: "module49-f70fb.firebaseapp.com",
  projectId: "module49-f70fb",
  storageBucket: "module49-f70fb.firebasestorage.app",
  messagingSenderId: "580182680846",
  appId: "1:580182680846:web:8cbb17a4b7f57ade12635f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);