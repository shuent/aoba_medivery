import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={`has-text-weight-bold ${styles.title}`}>Medivery</h1>

        <p className={styles.description}>
          一人暮らしで体調不良のときの薬・食べ物デリバリーサービス
        </p>

        <div className={styles.grid}>
          <Link href="/form">
            <a className={styles.card}>
              <h2>症状選択する &rarr;</h2>
              <p>
                症状を入力して、最適な商品をレコメンド、選んだ商品を自宅に届けます。
              </p>
            </a>
          </Link>
          <Link href="/login">
            <a className={styles.card}>
              <h2>会員登録・ログインする &rarr;</h2>
              <p>元気なときに情報を登録しておきましょう。</p>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>Powered by Aoba</footer>
    </div>
  );
}
