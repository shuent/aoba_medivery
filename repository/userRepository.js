import { fireDb } from "../lib/firebase";

const usersRef = fireDb.collection("users")

const setUserInfo = async (userId, values) => {
    // return Promise<undefined>
    return usersRef.doc(userId).set(values)
}

export {setUserInfo}