import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Medivery</title>
      </Head>

      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">
            Medivery
          </p>
          <p className="subtitle">
            体調が悪いときのデリバリー
          </p>
        </div>
      </section>

      <main className={`${styles.container}`}>

        
        <div className={`section ${styles.mainTitle}`}>
          <h1 className={`has-text-weight-bold is-size-2-mobile ${styles.title}`}>Medivery</h1>

          <p className={`is-size-5-mobile ${styles.description}`}>
            一人暮らしで体調不良のときの<br/>薬・食べ物のデリバリーサービス
          </p>
        </div>
        <div className={styles.grid}>
          <Link href="/form">
            <a className={styles.card}>
              <h2 className="is-size-5-mobile">症状選択する &rarr;</h2>
              <p className="is-size-6-mobile">
                症状を入力して、最適な商品をレコメンド、選んだ商品を自宅に届けます。
              </p>
            </a>
          </Link>
          <Link href="/login">
            <a className={styles.card}>
              <h2 className="is-size-5-mobile">会員登録・ログインする &rarr;</h2>
              <p className="is-size-6-mobile">元気なときに情報を登録しておきましょう。</p>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>Powered by Aoba</footer>
    </div>
  );
}
