import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/router'
import React,{ useEffect, useState } from 'react';
import { getAllProducts } from "../repository/productRepository";
import ProductCard from "../components/ProductCard.js";

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


  return (
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
          <div>
           <ProductCard product={suggestProduct} />
          </div>
        ))}
        <div>
          <button
            className="button"
            type="submit"
          >
          注文
          </button>
        </div>

      </main>

      <footer className={styles.footer}>Powered by Aoba</footer>
    </div>
  );
} 