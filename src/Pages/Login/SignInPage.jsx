import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, provider } from "../../Firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import "./Login.scss";
import UseAuth from "../../custom-hooks/UseAuth";
import Preloader from "../../Component/Navbar/Preloader";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [SigncurrentUser, setSignCurrentUser] = useState(false);
  const currentUser = UseAuth();
  useEffect(() => {
    const savedEmail = localStorage.getItem("emailSignUp");
    const savedPassword = localStorage.getItem("passwordSignUp");
    if (savedEmail && savedPassword) {
      setEmailSignIn(savedEmail);
      setPasswordSignIn(savedPassword);
    }
  }, []);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);

      const email = emailSignIn;
      const randomSignedConfirm = "LogginTrackerrandomSignedConfirmEmail";
      const password = passwordSignIn;

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user) {
        document.getElementById("error").innerHTML = "Account doesn't exist";
        setIsLoading(false);
        return;
      }

      setEmailSignIn("");
      setPasswordSignIn("");
      setIsLoading(false);
      setSignCurrentUser(true);
      window.localStorage.setItem("WithemailForSignedIn", randomSignedConfirm);
    } catch (error) {
      console.log("error: ", error);
      if (error.code === "auth/invalid-credential") {
        document.getElementById("error").innerHTML = "Account doesn't exist";
      } else {
        document.getElementById("error").innerHTML = error.message;
      }
      setIsLoading(false);
    }
  };

  

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const randomSignedConfirm = "LogginTrackerrandomSignedConfirmGoogle";
      const user = userCredential.user;
      const email = user.email;

      const usersCollectionRef = doc(db, "users", user.uid);
      await setDoc(usersCollectionRef, { email, googleAuth: true });
      setSignCurrentUser(true);
      window.localStorage.setItem(
        "WithGooglemailForSignedIn",
        randomSignedConfirm
      );

     

    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <div className="Login display">
      
      <div className="signUpIn">
        <div className="Sect SignIn display">
          <h1>Sign In</h1>
          <div id="error"></div>

          {currentUser ? (
            <div className="sectA display">
              <div className="sectB display LinkbuttonS">
                <h1>You have successfully Signed In to your account!!!</h1>
                <p className="display">Click to start application</p>
                <Link className="Linkbutton" to="/">
                  <button className="button">Let's Go</button>
                </Link>
              </div>
            </div>
          ) : (
            <div>
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
                      <Link to="/Sign-Up" className="clickable">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                  <button className="button" onClick={handleSignIn}>
                    Sign In
                  </button>
                  {isLoading && <Preloader />}
                </div>
              </div>
              <div className="sectA display">
                <div className="sectB">
                  <button
                    className="button google"
                    onClick={signInWithGoogle}
                  >
                    Sign In with Google
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInPage;