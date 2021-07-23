import { setOrder } from '../repository/orderRepository'
import { setMail } from '../repository/mailRepository'
import { getDrivers } from '../repository/driversRepository'

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.VERCEL_URL
    : 'http://localhost:3000'

export const takeOrder = async (userId, productsOrderd) => {
  const drivers = await getDrivers()
  // randomly choose driver
  const chosenDriverEmail = drivers[Math.floor(Math.random() * drivers.length)]

  const orderId = await setOrder(userId, productsOrderd)

  await setMail(chosenDriverEmail, {
    name: 'chooseDriver',
    data: {
      driverUrl: `${baseUrl}/drivers/orders/${orderId}`,
    },
  })

  return orderId
}
