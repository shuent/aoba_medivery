import { fireDb } from "../lib/firebase";

const driversRef = fireDb.collection("drivers")

/**
 * @returns {DocumentRef} docRef
 */
const getDrivers = async () => {
    const qs = await driversRef.get()
    return qs.docs.map(doc=>doc.id)
}

export {getDrivers}