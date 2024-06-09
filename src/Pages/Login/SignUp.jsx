import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import Preloader from "../../Component/Navbar/Preloader";
import UseAuth from "../../custom-hooks/UseAuth";

const SignUp = () => {
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [confirmPasswordSignUp, setConfirmPasswordSignUp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const currentUser = UseAuth();

  const Signup = async () => {
    try {
      setIsLoading(true);

      if (passwordSignUp !== confirmPasswordSignUp) {
        document.getElementById("errorUp").innerHTML =
          "Passwords do not match.";
        setIsLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailSignUp,
        passwordSignUp
      );
      const user = userCredential.user;

      if (!user) {
        document.getElementById("errorUp").innerHTML =
          "Account creation failed.";
        setIsLoading(false);
        return;
      }

      const usersCollectionRef = doc(db, "users", user.uid);
      await setDoc(usersCollectionRef, {
        email: emailSignUp,
        googleAuth: false,
      });

      setEmailSignUp("");
      setPasswordSignUp("");
      setConfirmPasswordSignUp("");
      setIsLoading(false);

      navigate("/SignIn");
    } catch (error) {
      console.log("error: ", error);
      document.getElementById("errorUp").innerHTML = error.message;
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="Login display">
        <div className="signUpIn">
          <div className="Sect SignUp display">
            <h1>Sign Up</h1>
            <div id="errorUp"></div>
            {currentUser ? (
              <div className="sectA display">
                <div className="sectB display LinkbuttonS">
                  <h1>You have successfully created your account!!!</h1>
                  <p className="display">Click to Sign In to your account</p>
                  <Link className="Linkbutton" to="/SignIn">
                    <button className="button">Sign In</button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="sectA display">
                <div className="sectB display">
                  <div className="inputcontrol display">
                    <p>Enter Email...</p>
                    <input
                      type="email"
                      value={emailSignUp}
                      onChange={(e) => setEmailSignUp(e.target.value)}
                    />
                  </div>
                  <div className="inputcontrol display">
                    <p>Enter Password...</p>
                    <input
                      type="password"
                      placeholder="Password"
                      value={passwordSignUp}
                      onChange={(e) => setPasswordSignUp(e.target.value)}
                    />
                  </div>
                  <div className="inputcontrol display">
                    <p>Confirm Password...</p>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPasswordSignUp}
                      onChange={(e) => setConfirmPasswordSignUp(e.target.value)}
                    />
                  </div>
                  <small>
                    Already have an account?{" "}
                    <Link to="/SignIn" className="clickable">
                      Sign In
                    </Link>
                  </small>

                  <button className="button" onClick={Signup}>
                    Sign Up
                  </button>

                  {isLoading && <Preloader />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;