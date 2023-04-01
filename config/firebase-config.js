

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 



const firebaseConfig = {
  apiKey: "AIzaSyC4CUrIzQjvUo1Vwdhj7bmzRohxYJiQ3F0",
  authDomain: "fooddeliveryapp-5503d.firebaseapp.com",
  projectId: "fooddeliveryapp-5503d",
  storageBucket: "fooddeliveryapp-5503d.appspot.com",
  messagingSenderId: "970708991410",
  appId: "1:970708991410:web:15ede694adbd63ca7f78ab",
  measurementId: "G-HK4S5CVF81"
};

const app = initializeApp(firebaseConfig); 
  export const auth = getAuth(app); 
