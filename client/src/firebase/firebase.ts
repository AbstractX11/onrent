// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";                           
import "firebase/compat/firestore";
import "firebase/compat/auth";
import {ref,onUnmounted} from 'vue'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const Config = {
  apiKey: "AIzaSyDWvjzXG1wFX0qPcBMhUIS5XFhaNh4Ky8g",
  authDomain: "onrent-dd339.firebaseapp.com",
  projectId: "onrent-dd339",
  storageBucket: "onrent-dd339.appspot.com",
  messagingSenderId: "430116853328",
  appId: "1:430116853328:web:2037bdc9611537862ca355"
};

// Initialize Firebase
const firebaseApp =  firebase.initializeApp(Config);
const db = firebaseApp.firestore();
const usersCollection = db.collection ('/users')
export const auth = firebaseApp.auth();


export const createUser = (user:any)=>{
  return usersCollection.doc(user.uid).set({
    username:user.username,
  })
}

export const getuser =async (id:string)=>{
  const user = await usersCollection.doc(id).get()
  return user.exists? user.data(): null
}
export const deleteUser = (id:string)=>{
  return usersCollection.doc(id).delete()
}
export const updateUser = (id:string,user:any)=>{
  return usersCollection.doc(id).update(user)
}
// export const useLoadUsers =()=>{
//   const users =ref([])
//   const close = usersCollection.onSnapshot(snapshot=>{
//     users.value = snapshot.docs.map(doc=>({id: doc.id,...doc.data()}))
//   })
//   onUnmounted(close)
//   return users
// }