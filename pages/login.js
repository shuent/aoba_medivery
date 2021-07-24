// Import FirebaseAuth and firebase.
import React from "react";
import { useRouter } from "next/router";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firebase, fireAuth } from "../lib/firebase";
import { AuthContext } from "../hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";

function SignInScreen() {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // signInSuccessUrl: '/register',
    // We will display Google and Facebook as auth providers.
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        const user = authResult.user;
        const credential = authResult.credential;
        const isNewUser = authResult.additionalUserInfo.isNewUser;
        const providerId = authResult.additionalUserInfo.providerId;
        const operationType = authResult.operationType;

        const hasBasicInfo = false; // TODO: has user info in users db

        if (isNewUser || !hasBasicInfo) {
          router.push(`/users/${user.uid}/register`);
        } else {
          router.push("/");
        }
        return false;
      },
    },
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  };

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css" />
      </Head>

      <h1>Login</h1>
      {currentUser ? (
        <p>alreay logged in</p>
      ) : (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fireAuth} />
      )}
    </div>
  );
}

export default SignInScreen;
