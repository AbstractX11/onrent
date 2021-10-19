// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { ref, onUnmounted } from "vue";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const Config = {
  apiKey: "AIzaSyDWvjzXG1wFX0qPcBMhUIS5XFhaNh4Ky8g",
  authDomain: "onrent-dd339.firebaseapp.com",
  projectId: "onrent-dd339",
  storageBucket: "onrent-dd339.appspot.com",
  messagingSenderId: "430116853328",
  appId: "1:430116853328:web:2037bdc9611537862ca355",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(Config);
export const db = firebaseApp.firestore();

//firebase auth
export const auth = firebaseApp.auth();

// export const useLoadUsers =()=>{
//   const users =ref([])
//   const close = usersCollection.onSnapshot(snapshot=>{
//     users.value = snapshot.docs.map(doc=>({id: doc.id,...doc.data()}))
//   })
//   onUnmounted(close)
//   return users
// }
