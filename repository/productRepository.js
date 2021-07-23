import { fireDb } from "../lib/firebase";

const productsRef = fireDb.collection("products")

const getAllProducts = async () => {
    const products_array = []
    // return Promise<undefined>
    const products_info = await productsRef.get()
    products_info.forEach((doc) => {
         products_array.push(doc.data())
    });
    
    return products_array
}

const getProduct = async (productId) => {
    const doc = await productsRef.doc(productId).get()
    const data = doc.data()
    return {id: doc.id, ...data}
}

export {getAllProducts, getProduct}