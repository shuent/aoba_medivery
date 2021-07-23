import { fireAuth } from "../lib/firebase";
import { AuthContext } from "../hooks/useAuth";
import { useContext } from "react";
import { useRouter } from "next/router";
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
    <>
      {currentUser ? (
        <div>
          <div>
            
            <Link href={`/users/${currentUser.uid}`}>
              <a> My Page: {currentUser.displayName}</a>
            </Link>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div> Please login</div>
      )}
    </>
  );
}

export { Header };
