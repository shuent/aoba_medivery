import { User } from "firebase";
import { createContext, useEffect, useState } from "react";

import {fireAuth} from "../lib/firebase";

// Contextを宣言。Contextの中身を {currentUser: undefined} と定義
const AuthContext = createContext({ currentUser: undefined });

const AuthProvider = (props) => {
  // Contextに持たせるcurrentUserは内部的にはuseStateで管理
  const [currentUser, setCurrentUser] = useState(
    undefined
  );

  useEffect(() => {
    // Firebase Authのメソッド。ログイン状態が変化すると呼び出される
    fireAuth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };