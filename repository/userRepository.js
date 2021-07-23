import { fireDb } from "../lib/firebase";

const usersRef = fireDb.collection("users")

const setUserInfo = async (userId, values) => {
    // return Promise<undefined>
    return usersRef.doc(userId).set(values)
}

const getUser = async (userId) => {
    // return Promise<undefined>
    const doc = await usersRef.doc(userId).get()
    return {id: doc.id, ...doc.data()}
}

export {setUserInfo, getUser}