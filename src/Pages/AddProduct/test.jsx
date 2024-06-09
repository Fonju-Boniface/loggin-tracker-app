import { Box, Button, Heading, Input, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import "./Login.scss";
import { Link } from "react-router-dom";
import UseAuth from "../../custom-hooks/UseAuth";

const Login = () => {
  // * Signup with email and password States
  const [emailSignUp, setEmailSignUp] = useState("");
  const [nameSignUp, setNameSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [confirmPasswordSignUp, setConfirmPasswordSignUp] = useState("");

  // * Signin with email and password States
  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");

  // * Signup function with email and password
  const Signup = async () => {
    try {
      // Set loading state to true
      setIsLoading(true);

      const email = emailSignUp;
      const password = passwordSignUp;

      // Check if the password and confirm password match
      if (password !== confirmPasswordSignUp) {
        document.getElementById("errorUp").innerHTML = "Passwords do not match.";
        setIsLoading(false); // Set loading state to false
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const usersCollectionRef = doc(db, "users", user.uid);
      await setDoc(usersCollectionRef, { email, password });

      setEmailSignUp("");
      setPasswordSignUp("");
      setConfirmPasswordSignUp("");
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      console.log("error: ", error);
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

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (!user) {
        alert("User doesn't exist");
      }
      setEmailSignIn("");
      setPasswordSignIn("");
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      console.log("error: ", error);
      document.getElementById("error").innerHTML = error.message;
      setIsLoading(false); // Set loading state to false if an error occurs
    }
  };

  const currentUser = UseAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  return (
    <div className="Login display">
      {/* // * Sign Up part */}
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
            </div>
            <div className="inputcontrol display">
              <button onClick={Signup}>
                {isLoading ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* isLoading */}