import "../styles/globals.css";
import { AuthContext, AuthProvider } from "../hooks/useAuth";
import { Header } from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}

export default MyApp;
