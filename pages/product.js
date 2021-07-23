import Head from "next/head";
import styles from "../styles/Home.module.css";
// import React, { useState } from 'react';
import { useRouter } from 'next/router'

export default function Product() {
  const router = useRouter()
  console.log(router.query);
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