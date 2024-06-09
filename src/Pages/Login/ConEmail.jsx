import { Box, Button, Heading, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  deleteUser,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase-config";
import UseAuth from "../../custom-hooks/UseAuth";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";

const ConEmail = () => {
  const currentUser = UseAuth();
  const [emailSignInLink, setEmailSignInLink] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const signInWithEmail = async () => {
    try {
      // Set loading state to true
      setIsLoading(true);

      const email = emailSignInLink;
      if (emailSignInLink === "") {
        alert("Please enter your email address");
        return;
      }

      // Generate the sign-in link
      const actionCodeSettings = {
        url: "http://localhost:3000/SignUp",
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      // Display success message
      //   alert("Email sent successfully");
      document.getElementById("successMessage").innerHTML =
        "Confirmation email sent successfully!";
      setEmailSignInLink("");
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      setIsLoading(false); // Set loading state to false if an error occurs
      document.getElementById("errorMessage").innerHTML =`Confirmation email not sent! try again later`;
      // document.getElementById("errorMessage").innerHTML =`Confirmation email not sent! </br> ${error.message}`;
    }
  };

  // Get the email and sign-in URL parameters from the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");
  const signInURL = window.location.href;

  // Complete the sign-in process
  signInWithEmailLink(auth, email, signInURL)
    .then((userCredential) => {})
    .catch((error) => {
      // Error occurred during sign-in
      console.log("Error signing in:", error);
    });

  // Delete account function
  //   const navigate = useNavigate();
  const deleteAccount = async () => {
    // window.localStorage.setItem("emailForSignIn");
    window.localStorage.removeItem("emailForSignIn");
  };

  return (
    <div className="Login display">
      <div className="ConEmail display flexCol">
        <input
          type="email"
          placeholder="Email"
          value={emailSignInLink}
          onChange={(e) => setEmailSignInLink(e.target.value)}
        />
        <div className="display flexCol spil">
          <p>A confirmation link will be sent to the email you input above</p>

          <div className="btns display">
            <button className="ConEmbutton" onClick={signInWithEmail}>
              Send_Link
            </button>

            <Link to="/SignIn" className="ConEmbutton" onClick={deleteAccount}>
              SignIn_instead
            </Link>
          </div>
        </div>
      </div>
      <div id="successMessage"></div>
      <div id="errorMessage"></div>
    </div>
  );
};

export default ConEmail;
