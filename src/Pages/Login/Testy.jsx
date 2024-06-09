// import { Box, Button, Heading, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  getAuth,
  signInWithEmailLink,
} from "firebase/auth";
import { auth, db, provider } from "../../Firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";

import "./Login.scss";
// import { Link } from "react-router-dom";
import UseAuth from "../../custom-hooks/UseAuth";
// import{ FaCircl } from "react-icons/fa";
import Preloader from "../../Component/Navbar/Preloader";

const Testy = () => {
  // * Signup with email and password States
  const [emailSignUp, setEmailSignUp] = useState("");
  const [nameSignUp, setNameSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [confirmPasswordSignUp, setConfirmPasswordSignUp] = useState("");
  const [emailSignInLink, setEmailSignInLink] = useState("");

  // * Signin with email and password States
  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");

  // * Signup function with email and password
  const Signup = async () => {
    try {
      const email = emailSignUp;
      const password = passwordSignUp;
      setIsLoading(true); // Set loading state to true
     

      // Check if the password and confirm password match
      if (password !== confirmPasswordSignUp) {
        document.getElementById("errorUp").innerHTML =
          "Passwords do not match.";
        setIsLoading(false); // Set loading state to false
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user) {
        // Display error message if the account already exists
        document.getElementById("errorUp").innerHTML = "Account already exists";
        setIsLoading(false); // Set loading state to false
        return;
      }

      const usersCollectionRef = doc(db, "users", user.uid);
      await setDoc(usersCollectionRef, { email, password });

      setEmailSignUp("");
      setPasswordSignUp("");
      setConfirmPasswordSignUp("");
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      console.log("error: ", error);
      console.error("Failed to send email verification", error);
      // alert(error);
      setIsLoading(false); // Set loading state to false if an error occurs
    }
  };

  // * SignIn function with email and password
  const SignIn = async () => {
    try {
      // Set loading state to true
      setIsLoading(true);
    

      const email = emailSignIn;
      const password = passwordSignIn;

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user) {
        // Display error message if the account doesn't exist
        document.getElementById("error").innerHTML = "Account doesn't exist";
        setIsLoading(false); // Set loading state to false
        return;
      }

      setEmailSignIn("");
      setPasswordSignIn("");
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      console.log("error: ", error);
      if (error.code === "auth/invalid-credential") {
        // Display "Account doesn't exist" message instead of Firebase error message
        document.getElementById("error").innerHTML = "Account doesn't exist";
      } else {
        document.getElementById("error").innerHTML = error.message;
      }
      setIsLoading(false); // Set loading state to false if an error occurs
    }
  };

  const signInWithEmail = async () => {
    try {
      // Set loading state to true
      setIsLoading(true);
   

      const email = emailSignInLink;

      // Generate the sign-in link
      const actionCodeSettings = {
        url: "http://localhost:3000/",
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      // Display success message
      document.getElementById("error").innerHTML = "Sign-in link sent to email";
      setEmailSignInLink("");
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      console.log("error: ", error);
      document.getElementById("error").innerHTML = error.message;
      setIsLoading(false); // Set loading state to false if an error occurs
    }
  };

  // Get the email and sign-in URL parameters from the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");
  const signInURL = window.location.href;
  // Complete the sign-in process
  
  signInWithEmailLink(auth, email, signInURL)
    .then((userCredential) => {
      // Sign-in successful, you can access the signed-in user
      var email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      } else {
        alert("all good signed in");
      }

      const user = userCredential.user;
      console.log("User signed in:", user);
      alert("User signed in:", user);
      // Redirect to the desired page after successful sign-in
      window.location.href = "/home";
    })
    .catch((error) => {
      // Error occurred during sign-in
      console.log("Error signing in:", error);
    });

  // * SignIn with Google
  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      // const name = user.displayName;
      const email = user.email;
      // const profilePic = user.photoURL;
   

      const usersCollectionRef = doc(db, "users", user.uid);
      await setDoc(usersCollectionRef, { email, googleAuth: true });
    } catch (error) {
      console.log("error: ", error);
      // document.getElementById("errorUp").innerHTML = error.message;
    }
  };

  const [isLoginOpen, setIsSiginOpen] = useState(false);

  const openSiginClick = () => {
    setIsSiginOpen(true);
  };
  const closeSiginClick = () => {
    setIsSiginOpen(false);
  };

  const currentUser = UseAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // useEffect(() => {
  // const checkEmailVerification = async () => {
  // const user = auth.currentUser;

  // if (user && user.emailVerified) {
  // alert("Email verification successful.");
  // }
  // };

  // checkEmailVerification();
  // }, []);
  return (
    <div className="Login display">
      <div className="signUpIn">
        
        {/* // * Sign Up part */}
        {isLoginOpen && (
          <div className="Sect SignUp display">
            <h1>Sign Up</h1>
            <small id="errorUp"></small>
            <div className="sectA display">
              <div className="sectB display">
                <div className="inputcontrol display">
                  <p>Enter Email...</p>
                  <input
                    type="email"
                    placeholder="Email"
                    value={emailSignUp}
                    onChange={(e) => setEmailSignUp(e.target.value)}
                  />
                </div>
                <div className="inputcontrol display">
                  <p>Enter Password...</p>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={passwordSignUp}
                    onChange={(e) => setPasswordSignUp(e.target.value)}
                  />
                </div>
                <div className="inputcontrol display">
                  <p>Confirm Password...</p>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPasswordSignUp}
                    onChange={(e) => setConfirmPasswordSignUp(e.target.value)}
                  />
                  <div
                    className="eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                <button className="button" onClick={Signup}>
                  "Sign Up"
                </button>
                {isLoading && <Preloader />}
              </div>
              <div className="sectC display">
                <p>
                  Already have an account?{" "}
                  <span className="clickable" onClick={closeSiginClick}>
                    Sign In
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
        {/* // * Sign In part */}
        {!isLoginOpen && (
          <div className="Sect SignIn display">
            <h1>Sign In</h1>
            <div id="error"></div>
            <div className="sectA display">
              <div className="sectB display">
                <div className="inputcontrol display">
                  <p>Enter Email...</p>
                  <input
                    type="email"
                    placeholder="Email"
                    value={emailSignIn}
                    onChange={(e) => setEmailSignIn(e.target.value)}
                  />
                </div>
                <div className="inputcontrol display">
                  <p>Enter Password...</p>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={passwordSignIn}
                    onChange={(e) => setPasswordSignIn(e.target.value)}
                  />
                  <div
                    className="eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                  <p>
                    Don't have an account?{" "}
                    <span className="clickable" onClick={openSiginClick}>
                      Sign Up
                    </span>
                  </p>
                </div>
                <button className="button" onClick={SignIn}>
                  Sign In
                </button>
                {isLoading && <Preloader />}
              </div>
              <div className="sectA display">
                <div className="sectB">
                  <button className="button google" onClick={signInWithGoogle}>
                    Sign In with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="inputcontrol display">
          {" "}
          <p>Enter Email for Sign In Link...</p>{" "}
          <input
            type="email"
            placeholder="Email"
            value={emailSignInLink}
            onChange={(e) => setEmailSignInLink(e.target.value)}
          />{" "}
        </div>{" "}
        <button className="button" onClick={signInWithEmail}>
          {" "}
          Sign In with Email Link{" "}
        </button>{" "}
      </div>
    </div>
  );
};

export default Testy;
