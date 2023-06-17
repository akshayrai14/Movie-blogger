// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ52DrfgPtBSbqzGqZUBiV2B-__24AkcA",
  authDomain: "fir-c17ae.firebaseapp.com",
  projectId: "fir-c17ae",
  storageBucket: "fir-c17ae.appspot.com",
  messagingSenderId: "934549506467",
  appId: "1:934549506467:web:c4e335d7e97fe2bb04f216"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);