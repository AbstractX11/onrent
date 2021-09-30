import { db } from "./firebase";

export const getProducts = async (path: string) => {
  try {
    const productCollection = db.collection(path);
    const Products = await productCollection.get();
    return Products.docs.map((doc) => {
      const product = { ...doc.data(), id: doc.id };
      return product;
    });
  } catch (error:any) {
    console.log(error.message);
  }
};
export const saveProduct = async (form: any) => {
  try{
    const productCollection = db.collection(form.collectionPath);
    const newForm = {
      Image: form.image,
      Name: form.name,
      Address: form.address,
      Price: form.price,
      Description: form.description,
      sellerid: form.uid,
    }
    const addProduct= await productCollection.add(newForm);
    if (addProduct){
    return('')
    }
  }catch(error:any){
    return(error.message)
  }  
};
