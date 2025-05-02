import React, { useRef, useState } from "react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Link } from "react-router";

const SignIn = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const emailRef = useRef();
  const handelSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setError("");
    setSuccess(false);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (!userCredential.user.emailVerified) {
          alert("sorry");
        } else {
          setSuccess(true);
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(error.message);
      });
  };
  const handelForGetPassword = () => {
    const email = emailRef;
    console.log(email);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handelSubmit} className="form">
                <label className="label">Email</label>
                <input
                  ref={emailRef}
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <div>
                  <a
                    onClick={handelForGetPassword()}
                    className="link link-hover"
                  >
                    Forgot password?
                  </a>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
              </form>
              <p>
                Don't have an account <Link to="/emailLogin">Resister</Link>
              </p>
              {error && <p>{error}</p>}
              {success && <p>Done</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
