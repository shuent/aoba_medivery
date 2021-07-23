import { fireDb, firebase } from "../lib/firebase";
import { getUser, setUserInfo } from "./userRepository";
import { getProduct } from "./productRepository";
const ordersRef = fireDb.collection("orders")

/**
 * @param {User} user 
 * @param {Array<{id: string, quantity: number}} productsWithQueantity 
 * @returns {Promise<string>} orderRef
 */

const setOrder = async (userId, productsWithQuantity) => {
    // return Promise<undefined>
    const user = await getUser(userId)
    // status = "processing" | "done"
    const doc = await ordersRef.add({
        user,
        productsWithQuantity,
        status: "processing",
        issuedDate: firebase.firestore.FieldValue.serverTimestamp()
    })
    return doc.id
}

const setOrderDone = (orderId) => {
    return ordersRef.doc(orderId).update({status: "done"})
}

const getOrderWithProducts = async (orderId) => {
    const doc = await ordersRef.doc(orderId).get()
    const {productsWithQuantity, status, issuedDate, user} = doc.data()

    const products = await Promise.all(productsWithQuantity.map( async (p) => {
        console.log(p)
        const product = await getProduct(p.id)
        const quantity = p.quantity
        return { quantity, ...product }
    }))
    
    return {id: doc.id, status, issuedDate, user, products}
}

export {setOrder, setOrderDone, getOrderWithProducts}