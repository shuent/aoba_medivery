import { fireAuth } from '../lib/firebase'
import { AuthContext } from '../hooks/useAuth'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

function Header() {
  const router = useRouter()
  const { currentUser } = useContext(AuthContext)

  const handleLogout = () => {
    fireAuth.signOut().then(() => {
      router.replace('/')
    })
  }

  return (
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item">Medivery</a>
        </Link>

        <a
          role="button"
          className={`navbar-burger ${styles.burger}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link href={`/form`}>
            <a className="navbar-item">診断フォーム</a>
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {currentUser ? (
                <div>
                  <Link href={`/users/${currentUser.uid}`}>
                    <strong className="button is-primary">
                      {' '}
                      マイページへ: {currentUser.displayName}
                    </strong>
                  </Link>
                  <a className="button is-light" onClick={handleLogout}>
                    ログアウト
                  </a>
                </div>
              ) : (
                <div>
                  <Link href={`/login`}>
                    <a className="button"> ログインページへ</a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export { Header }
