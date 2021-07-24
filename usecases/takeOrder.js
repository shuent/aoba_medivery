import { setOrder } from '../repository/orderRepository'
import { setMail } from '../repository/mailRepository'
import { getDrivers } from '../repository/driversRepository'

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : 'http://localhost:3000'

export const takeOrder = async (userId, userEmail, productsOrderd) => {
  const drivers = await getDrivers()
  // randomly choose driver
  const chosenDriverEmail = drivers[Math.floor(Math.random() * drivers.length)]

  const orderId = await setOrder(userId, productsOrderd)

  // send driver mail
  await setMail(chosenDriverEmail, {
    name: 'chooseDriver',
    data: {
      driverUrl: `${baseUrl}/drivers/orders/${orderId}`,
    },
  })

  // send ordered user mail
  await setMail(userEmail, {
    name: 'orderConfirmation',
    data: {
      orderUrl: `${baseUrl}/orders/${orderId}`,
    },
  })

  return orderId
}
