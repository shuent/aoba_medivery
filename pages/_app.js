import "../styles/globals.css";
import { AuthContext, AuthProvider } from "../hooks/useAuth";
import { Header } from "../components/Header";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <meta name="description" content="Medivery app" />
        <meta name="title" content="Medivery" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css" />
      </Head>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}

export default MyApp;
