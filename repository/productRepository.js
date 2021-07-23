import { fireDb } from "../lib/firebase";

const productsRef = fireDb.collection("products")

const getAllProducts = async () => {
    const products_array = []
    // return Promise<undefined>
    const products_info = await productsRef.get()
    products_info.forEach((doc) => {
       const data = doc.data()
         products_array.push({
            id: doc.id,
            explanation: data.explanation,
            image: data.image, 
            price: data.price,
            maker: data.maker,
            usage: data.usage,
            tag: data.tag,
            name: data.name
         })
    });
    
    return products_array
}

export {getAllProducts}