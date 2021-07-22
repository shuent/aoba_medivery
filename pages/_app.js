import "../styles/globals.css";
import { AuthContext, AuthProvider} from '../hooks/useAuth'
import {useContext} from 'react'
import {fireAuth} from '../lib/firebase'

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

const handleLogout = () => {
  fireAuth.signOut()
}

function Header() {
  const { currentUser} = useContext(AuthContext)
  console.log(currentUser)

  return (
    <>
    {currentUser ? 
    <div>
      <div>Welcome, {currentUser.displayName}</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
      :
      <div> Please login</div>
    }
    
    </>
  )
}

export default MyApp;
