import { fireDb } from "../lib/firebase";

const mailRef = fireDb.collection("mail")

/**
 * @param {string} to
 * @param {{name: string, data: object}} template
 * @returns {DocumentRef} docRef
 */
const setMail = (to, template) => {
    return mailRef.add({to, template})
}

export {setMail}