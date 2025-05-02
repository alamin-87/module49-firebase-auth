import React, { use, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Mail = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const handelRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoUrl = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    console.log(email, password, terms);
    setSuccess(true);
    setError("");
    if (!terms) {
      setError("Please accept our condition");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        // ...
        // mail verification
        sendEmailVerification(auth.currentUser).then(() => {
            setSuccess(true);
          // Email verification sent!
          // ...
        });
        // update user profile
        const profile = {
          displayName: name,
          photoURL: photoUrl,
        };
        updateProfile(auth.currentUser, profile)
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        // ..
      });
  };
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center mt-10">
        <h1>Email Password Register</h1>
        <form
          onSubmit={handelRegister}
          className=" shadow-2xl p-3 flex flex-col gap-5"
        >
          <p>This is Registration</p>
          {/* email filed */}
          <div className="join">
            <div className=" flex flex-col gap-2">
              <label className="input validator join-item">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </label>
              <label className="input validator join-item">
                <input
                  type="text"
                  name="photo"
                  placeholder="photo url"
                  required
                />
              </label>
              <label className="input validator join-item">
                <input
                  type="email"
                  name="email"
                  placeholder="mail@site.com"
                  required
                />
              </label>
            </div>
          </div>
          {/* password filed */}
          <label className="input validator">
            <div className="relative">
              <input
                name="password"
                type={show ? "text" : "password"}
                required
                placeholder="Password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
              {show ? (
                <IoMdEye
                  onClick={() => {
                    setShow(!show);
                  }}
                  className="btn btn-xs text-sm absolute top-[-1px] right-[-12px]"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => {
                    setShow(!show);
                  }}
                  className="btn btn-xs text-sm absolute top-[-1px] right-[-12px]"
                />
              )}
            </div>
          </label>
          {/* submit btn */}
          <input className="btn btn-primary" type="submit" value="Submit" />
          <div>
            <input
              name="terms"
              type="checkbox"
              className="checkbox checkbox-md"
            />
            <Link>Accept terms amd conditions</Link>
          </div>
          <p>
            Already have an account <Link to="/login">Login</Link>
          </p>
        </form>
        {error && <p>{error}</p>}
        {success && <p>User created successfully</p>}
      </div>
    </>
  );
};

export default Mail;
