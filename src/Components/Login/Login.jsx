import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { GithubAuthProvider } from "firebase/auth";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const GithubProvider = new GithubAuthProvider();
  const [user, setUser] = useState(null);

  const handelGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        setUser(result.user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const handelSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out completed");
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handelLoginGithub = () => {
    signInWithPopup(auth, GithubProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const loggedUser = result.user;
        if(!loggedUser.email){
          console.log('no mail')
          if(loggedUser.providerData[0].email){
            loggedUser.email=loggedUser.providerData[0].email;
          }
        }
        setUser(loggedUser);
        console.log(loggedUser);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handelLogoutGithub = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <>
      <div className=" flex flex-col justify-center items-center mt-10 gap-5">
        <h1>Please Login</h1>

        {user ? (
          <div>
            <button
              onClick={() => handelSignOut()}
              className=" bg-red-100 rounded-xl px-4 py-1 text-red-600 cursor-pointer"
            >
              Sign Out google
            </button>
            <button
              onClick={() => handelLogoutGithub()}
              className=" bg-red-100 rounded-xl px-4 py-1 text-red-600 cursor-pointer"
            >
              Sign Out github
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => handelGoogleSignIn()}
              className=" bg-blue-100 rounded-xl px-4 py-1 text-blue-600 cursor-pointer"
            >
              Sign in with Google
            </button>
            <button
              onClick={() => handelLoginGithub()}
              className=" bg-blue-100 rounded-xl px-4 py-1 text-blue-600 cursor-pointer"
            >
              Sign in with Github
            </button>
          </div>
        )}
        <div>
          <h2>User Name: {user?.displayName}</h2>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </>
  );
};

export default Login;
