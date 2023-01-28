import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgVaocpf9WkdNXIyQi6r0Jf3DIjLLPABo",
  authDomain: "practice-56087.firebaseapp.com",
  projectId: "practice-56087",
  storageBucket: "practice-56087.appspot.com",
  messagingSenderId: "640572086569",
  appId: "1:640572086569:web:6d076be71d946851787f38",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
