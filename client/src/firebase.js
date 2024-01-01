// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "homesellarscouk-c66ca.firebaseapp.com",
  projectId: "homesellarscouk-c66ca",
  storageBucket: "homesellarscouk-c66ca.appspot.com",
  messagingSenderId: "462019329428",
  appId: "1:462019329428:web:dcd3893ede2375b4312381"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
