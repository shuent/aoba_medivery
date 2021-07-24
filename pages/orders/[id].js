import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getOrderWithProducts, setOrderDone } from '../../repository/orderRepository'

const OrderPage = () => {
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

  const totalPrice = (order) =>{
      return order.products.reduce((acc, product) => acc + Number(product.quantity) * Number(product.price),0)
  }

  if (!order) {
    return <div>Order not found</div>
  }

  return (
    <div className="container content section">
    <p><b>注文完了しました。数時間以内にお届けしますので、お待ちください。</b></p>
        <p>配達状況: {order.status === "done" ? "配達完了" : "配達中"}</p>
      <p>注文日時: {order.issuedDate?.toDate().toLocaleString()}</p>
      <p>お届け先: {order.user.address}</p>
      <div>支払い方法: {order.user.pay_method === "cash" ? "現金" : "クレジットカード"}</div>
      <h2>買い物リスト</h2>
      <div>
        {order.products.map((product) => {
            
          return (<div className="box" key={product.name}><div>{product.name}</div>
          <div>{product.quantity}個</div>
          <div>{product.price}円</div>
            </div>)
        })}
        <div className="block">

        <p>合計金額: <b>{totalPrice(order)} 円</b></p>
        </div>
      </div>
    </div>
  )
}

export default OrderPage
