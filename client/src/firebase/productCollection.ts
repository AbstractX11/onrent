import { db } from "./firebase";

//getting all products
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

//saving products
export const saveProduct = async (form: any) => {
  try {
    const productCollection = db.collection(form.collectionPath);
    const newForm = {
      Image: form.image,
      Name: form.name,
      Address: form.address,
      Price: form.price,
      Description: form.description,
      sellerid: form.uid,
    };
    const addProduct = await productCollection.add(newForm);
    if (addProduct) {
      return "";
    }
  } catch (error:any) {
    return error.message;
  }
};

//getting single product
export const getProduct = async (path: string, id: string) => {
  try {
    const productCollection = db.collection(path);
    const user = await productCollection.doc(id).get();
    return user.exists ? user.data() : null;
  } catch (error) {
    console.log(error);
  }
};

//updating product
export const updateProduct = async (product: any) => {
  try {
    const productCollection = db.collection(product.collectionPath);
    const newForm = {
      Image: product.image,
      Name: product.name,
      Address: product.address,
      Price: product.price,
      Description: product.description,
      sellerid: product.uid,
    };
    await productCollection.doc(product.id).update(newForm);
  } catch (error) {
    console.log(error);
  }
};

export const getProfileProducts = async (id:string)=>{
    const paths = [
      'electronics',
      'houses',
      'rooms',
      'vehicles'
    ]
    let products:any=[]
    try{
      for(let i=0;i < 4;i++){
      const collectionPath = "products/types/" + paths[i]
      const res = await db.collection(collectionPath).where("sellerid", "==", id)
      .get()
       res.docs.map((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const product = { ...doc.data(), id: doc.id };
            products.push(product)
        });
    }}
    catch(error){
      console.log("Error getting documents: ", error);
  }
  return (products)
}

