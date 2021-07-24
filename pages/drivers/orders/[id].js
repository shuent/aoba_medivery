import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getOrderWithProducts, setOrderDone } from '../../../repository/orderRepository'

const DriverOrderTakePage = () => {
  const router = useRouter()
  const { id: orderId } = router.query

  const [order, setOrder] = useState()

    const handleClick= ()=>{
    setOrderDone(orderId)
    // TODO: send orderd user email.
  }

  useEffect(() => {
    if (!orderId) return
    getOrderWithProducts(orderId).then((order) => {
      setOrder(order)
    })
  }, [orderId, handleClick]) // reload data on button click

  const totalPrice= (order) =>{
      return order.products.reduce((acc, product) => acc + Number(product.quantity) * Number(product.price),0)
  }



  if (!order) {
    return <div>Order not found</div>
  }

  return (
    <>
      <div>配達状況: {order.status}</div>
      <div>注文日時: {order.issuedDate?.toDate().toLocaleString()}</div>
      <div>お届け先: {order.user.address}</div>
      <div>支払い方法: {order.user.pay_method}</div>
      <h2>買い物リスト</h2>
      <div>
        {order.products.map((product) => {
            
          return (<li><div>{product.name}</div>
          <div>{product.quantity}個</div>
          <div>{product.price}円</div>
            </li>)
        })}
        合計金額: {totalPrice(order)} 円
      </div>
      <button onClick={handleClick}>配達完了</button>
    </>
  )
}

export default DriverOrderTakePage
