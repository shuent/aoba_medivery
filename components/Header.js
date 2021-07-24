import { fireAuth } from "../lib/firebase";
import { AuthContext } from "../hooks/useAuth";
import { useContext } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Link from "next/link";

function Header() {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    fireAuth.signOut().then(() => {
      router.replace("/");
    });
  };

  return (

    <div>
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" >
            <Link href={`/`}>
              <a className={`has-text-weight-bold ${styles.head_title}`}>Medivery</a>
            </Link>
          </a>

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <Link href={`/form`}>
              <a class="navbar-item">診断フォーム</a>
            </Link>
            <a class="navbar-item">Documentation</a>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-info">



                {currentUser ? (
                  <div>
                    <div>
                      <Link href={`/users/${currentUser.uid}`}>
                        <a class="button is-light"> マイページへ: {currentUser.displayName}</a>
                      </Link>
                    </div>
                    <a class="button is-light" onClick={handleLogout}>ログアウト</a>
                  </div>
                ) : (
                  <div>
                    <Link href={`/login`}>
                      <a> ログインページへ</a>
                    </Link>
                  </div>

                )}

        
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export { Header };
