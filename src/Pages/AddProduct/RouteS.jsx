import { Link, Route, Routes } from "react-router-dom";
import UseAuth from "../../custom-hooks/UseAuth";
import Navbar from "../../Component/Navbar/Navbar";
import Home from "../Home/Home";
import AddProduct from "./AddProduct";
import "../../App.css";
import Profile from "../Profile/Profile";
import { Logout } from "@mui/icons-material";
import SignOut from "../Login/SignOut";
import { useState, useEffect } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { ContactUs } from "../Contactus/ContactUs";
import Preloader from "../../Component/Navbar/Preloader";
import SignInPage from "../Login/SignInPage";
import Up from "../Login/Up";
import SignUp from "../Login/SignUp";

function RouteS() {
  const currentUser = UseAuth();
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSignOutClick = () => {
    setIsSignOutOpen(true);
    setIsLoading(false);
  };

  const handleSignOutClickOff = () => {
    setIsSignOutOpen(false);
    setIsLoading(false);
  };

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <div>
        <Preloader />
      </div>
    );
  }

  return (
    <div className="App display">
      <div
        className={
          !currentUser
            ? "display AppContainer HomebgColr"
            : "display AppContainer"
        }
      >
        {/* Conditionally render the Navbar */}
        {currentUser && <Navbar />}

        {/* Routes */}
        <div className="routes display">
          {isSignOutOpen && (
            <div className="Signout_form display">
              <div className="Herobtn display">
                {currentUser && (
                  <FaCircleXmark
                    className="Xmark"
                    onClick={handleSignOutClickOff}
                  />
                )}
              </div>
              {currentUser && <SignOut />}
              {!currentUser && (
                <div className="NowOutBtn display">
                  <h1>Your are now logged out</h1>
                  <div className="btns">
                    <Link
                      className="btn"
                      to="/"
                      onClick={handleSignOutClickOff}
                    >
                      let's Go!!
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
          {currentUser && (
            <div className="Herobtn display">
              {/* SignOut btn */}
              <Logout onClick={handleSignOutClick} />
            </div>
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SignIn" element={<SignInPage />} />
            <Route path="/Up" element={<Up />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/newproduct" element={<AddProduct />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default RouteS;
