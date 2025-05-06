// backend/config/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBlQmX4jn3A8x7sNVi97cSgyS2fjx9grmU",
  authDomain: "podiumsportmais-af32a.firebaseapp.com",
  databaseURL: "https://podiumsportmais-af32a-default-rtdb.firebaseio.com",
  projectId: "podiumsportmais-af32a",
  storageBucket: "podiumsportmais-af32a.firebasestorage.app",
  messagingSenderId: "57989505951",
  appId: "1:57989505951:web:17e733d6ab1b27548053aa",
  measurementId: "G-SNEVLJ3082"
};

const app = initializeApp(firebaseConfig);
const dbFirebase = getDatabase(app);

export default dbFirebase;
