import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/router'
import React,{ useEffect, useState } from 'react';
import { getAllProducts } from "../repository/productRepository";
import { takeOrder } from "../usecases/takeOrder"
import ProductCard from "../components/ProductCard";

export default function Product() {
  const router = useRouter()
  console.log(router.query);

  const [products, setProducts] = useState([])
    useEffect(() => {
        getAllProducts().then((data)=>{
            setProducts(data)
           })  
    }, []);

    const selectedTag = router.query.tag

    console.log(selectedTag);
    // const [suggestProducts,setSuggestProducts]= useState([])

    const suggestProducts = products.filter(item => item.tag.includes(selectedTag))

    // const [order, setOrder] = useState({id:'',quantity: 0})

    const orderList = suggestProducts.map((suggestProduct)　=> {
       return {quantity: 0,id: suggestProduct.id};
      });

    console.log(orderList)

    const [count, setCount] = useState(0);

    const checkOrder = (id) =>　{
      const productIndex = orderList.findIndex(item => item.id === id)
      console.log(orderList[productIndex])
      return orderList[productIndex].quantity
    }

    const addOrder = (id) =>　{
      const productIndex = orderList.findIndex(item => item.id === id)
      console.log(orderList[productIndex])
      



      // const [change, setChange] = useState(orderList[productIndex])
      // setChange({ quantity: change.quantity + 1 });
    }

    const minusOrder = (id) =>　{
      const productIndex = orderList.findIndex(item => item.id === id)
      console.log(orderList[productIndex])



      // const [change, setChange] = useState(orderList[productIndex])
      // setChange({ quantity: change.quantity - 1 });
    }

    const handleClick = ()=>{
      const userId = "BZlUBvQz7tRRuT50yaIOS86AiPl2" // should be currentUser id
      takeOrder(userId, orderList)
    }

  return (
    <>
    <div>
      <Head>
        <title>レコメンド商品一覧</title>
      </Head>

      <section className="hero">
        <div className="hero-body">
          <div clasclassNames="container">
            <span className="has-text-centered">
              Medivery
            </span>
          </div>
        </div>
      </section>

      <main className="container">
        <h1 className="title">レコメンド商品一覧</h1>
        {suggestProducts.map((suggestProduct) => (
          // <div>
          //  <ProductCard product={suggestProduct} />
          // </div>
          <div>
            <p>{suggestProduct.name}</p>
            <p>{suggestProduct.explanation}</p>    
            <p>{suggestProduct.price * checkOrder(suggestProduct.id)}円</p>
            <p><button onClick={() => addOrder(suggestProduct.id)}>+</button>{checkOrder(suggestProduct.id)}<button onClick={() => {minusOrder(suggestProduct.id)}}>-</button></p>
        </div>
        ))
        }
        <div>
          <button onClick={handleClick}>注文</button>
        </div>

      </main>

      <footer className={styles.footer}>Powered by Aoba</footer>
    </div>
    </>
  );
} 