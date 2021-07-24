import { fireDb } from '../lib/firebase'

const usersRef = fireDb.collection('users')

const setUserInfo = async (userId, values) => {
  // return Promise<undefined>
  return usersRef.doc(userId).set(values)
}

const getUser = async (userId) => {
  // return Promise<undefined>
  const doc = await usersRef.doc(userId).get()

  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() }
}

// const getUserIds = async () => {
//   // return Promise<undefined>
//   const qs = await usersRef.get()
//   return qs.docs.map((doc) => doc.id)
// }

export { setUserInfo, getUser }
