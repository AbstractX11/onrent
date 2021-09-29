import {db} from './firebase'

//Products collection
const productCollection = db.collection('/products/types/electronics')

export const getProducts = async ()=>{
    try{
        const Products = await productCollection.get()
        return Products.docs.map(doc=>{
            const product ={...doc.data(),id:doc.id}
            return product
        })
    }catch(error:any){
        console.log(error.message)
    }
}