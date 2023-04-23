import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1RyW7YkB5VfD83my0frhZJgBBLzITezQ",
  authDomain: "fooddeliveryapp-ac11b.firebaseapp.com",
  projectId: "fooddeliveryapp-ac11b",
  storageBucket: "fooddeliveryapp-ac11b.appspot.com",
  messagingSenderId: "992406592609",
  appId: "1:992406592609:web:13c727065cae7a3167de20",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
