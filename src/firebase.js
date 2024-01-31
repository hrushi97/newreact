// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1icoYfbz5lLJiOE4kDQilvwOm2RpFvy8",
  authDomain: "podcast-app-react-e40af.firebaseapp.com",
  projectId: "podcast-app-react-e40af",
  storageBucket: "podcast-app-react-e40af.appspot.com",
  messagingSenderId: "408428198058",
  appId: "1:408428198058:web:2414affb951c484412b8d3",
  measurementId: "G-TVP3Z66LJJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export{auth, db, storage};