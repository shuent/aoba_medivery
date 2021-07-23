import { fireDb } from "../lib/firebase";
import { getUser, setUserInfo } from "./userRepository";

const ordersRef = fireDb.collection("orders")

/**
 * @param {User} user 
 * @param {Array<{productId: string, quantity: number}} productsWithQueantity 
 * @returns {Promise<string>} orderRef
 */

const setOrder = async (userId, productsWithQueantity) => {
    // return Promise<undefined>
    const user = await getUser(userId)
    const doc = await ordersRef.add({
        user,
        productsWithQueantity
    })
    return doc.id
}

const getOrderWithProducts = async (orderId) => {
    const order = await ordersRef.doc(orderId)
}

export {setOrder}