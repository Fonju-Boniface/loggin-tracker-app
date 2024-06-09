// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, updateProfile } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
     apiKey: "AIzaSyAnK54homITz1xl-ON0cpZD2BxJlhqQ8yA",
  authDomain: "todo-list-17019.firebaseapp.com",
  databaseURL: "https://todo-list-17019-default-rtdb.firebaseio.com",
  projectId: "todo-list-17019",
  storageBucket: "todo-list-17019.appspot.com",
  messagingSenderId: "412592663173",
  appId: "1:412592663173:web:c916ebd2d2c58d5cc757ec",
  measurementId: "G-6VLCLNL952",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const storage = getStorage();
// export const db = getFirestore(app);
const db = getDatabase(app);
export const provider = new GoogleAuthProvider();
export { db };



// Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
//   alert("Uploaded file!");
  alert(photoURL);
}