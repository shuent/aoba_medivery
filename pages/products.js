import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { getAllProducts } from '../repository/productRepository'
import { takeOrder } from '../usecases/takeOrder'
import { AuthContext } from '../hooks/useAuth'
import { getUser } from '../repository/userRepository'


export default function Product() {
  const router = useRouter()
  const { currentUser } = useContext(AuthContext)

  const [orderList, setOrderList] = useState([])
  const [products, setProducts] = useState([])
  const [isCompletedOrder, setIsCompletedOrder] = useState(false)

  const { tag: selectedTag } = router.query

  const suggestProducts = products.filter((item) =>
    item.tag.includes(selectedTag)
  )

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data)
    })
  }, [])

  const getQuantity = (id) => {
    return orderList.find((order) => order.id === id)?.quantity ?? 0
  }

  const addOrder = (id, currentQuantity, price) => {
    const excepted = orderList.filter((ol) => ol.id !== id)
    setOrderList([...excepted, { id, quantity: currentQuantity + 1, price }])
  }

  const minusOrder = (id, currentQuantity, price) => {
    if (currentQuantity < 1) return

    const excepted = orderList.filter((ol) => ol.id !== id)
    setOrderList([...excepted, { id, quantity: currentQuantity - 1, price }])
  }

  const handleClick = async () => {
    const hasUser = currentUser && (await getUser(currentUser.uid))
    // if no user data registered, go to top
    if (!hasUser) {
      router.push('/')
      return
    }
    const userId = currentUser.uid
    const userEmail = currentUser.email

    const filtered = orderList.filter((ol) => ol.quantity > 0)
    const orderId = await takeOrder(userId, userEmail, filtered)

    router.push({
      pathname: '/orders/[id]',
      query: {
        id: orderId,
      },
    })
  }

  const totalPrice = () => {
    return orderList.reduce(
      (acc, product) => acc + Number(product.quantity) * Number(product.price),
      0
    )
  }

  if (!selectedTag || products.length === 0) return <div>loading</div>

  return (
    <>
      <div　className={styles.page}>
        <Head>
          <title>レコメンド商品一覧</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css" />
        </Head>

        <section className="hero">
          <div className="hero-body">
            <div clasclassNames="container">
              <span className="has-text-centered">Medivery</span>
            </div>
          </div>
        </section>

        <main className="container">
          <h1 className="title">レコメンド商品一覧</h1>
          {suggestProducts.map((suggestProduct) => {
            const currentQuantity = getQuantity(suggestProduct.id)
            return (

              // // <div>
              // //  <ProductCard product={suggestProduct} />
              // // </div>
              <div className={`card ${styles.margin}`}>
                <div className={'card-content'}>
                  <div className={"media-content"}>
                    <p className={`title ${styles.paddin}`}>{suggestProduct.name}</p>
                    <p className={`subtitle ${styles.paddin}`}>{suggestProduct.price}円</p>
                  </div>
                <div className={`content ${styles.paddin}`}>{suggestProduct.explanation}</div>
               

                
                <footer className={styles.cfooter}>
                  <button className={`button ${styles.citem}`}
                    onClick={() => {
                      minusOrder(suggestProduct.id, currentQuantity, suggestProduct.price)
                    }}
                  >
                    <label>-</label>
                  </button>
                  <label className={styles.citem}>{currentQuantity}</label>
                  <button className={`button ${styles.citem}`}
                    onClick={() => {
                      addOrder(suggestProduct.id, currentQuantity, suggestProduct.price)
                    }}
                  >
                    <label>+</label>
                  </button>
                </footer>
                
              </div>
            </div>
            )
          })}         
        </main>
        {/* <footer className={styles.footer}>Powered by Aoba</footer> */}
        <div className={styles.fix}>
          <div className={styles.order}>
            <span className={`has-text-weight-bold ${styles.sumprice}`}>合計料金: {totalPrice()}円</span>
            <button className={`button`} onClick={handleClick} disabled={(totalPrice() < 1) || isCompletedOrder}>注文</button>
            {isCompletedOrder && <div>注文完了しました。数時間以内にお届けしますので、お待ちください。</div>}
          </div>
          </div>
      </div>
    </>
  )
}
