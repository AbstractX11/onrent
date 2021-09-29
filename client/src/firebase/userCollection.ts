import {db} from './firebase'

//Usercollection
const usersCollection = db.collection ('/users')

//createuser function
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