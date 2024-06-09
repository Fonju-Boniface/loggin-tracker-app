import { useState, useEffect } from "react";
// import { FaMoon, FaSun } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import UseAuth from "../../custom-hooks/UseAuth";
import Profile from "../../Pages/Profile/Profile";
import "./Navbar.css";
import Loglength from "./Loglength";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaFacebook,
  FaGithub,
} from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

export default function Navbar() {
  const currentUser = UseAuth();
  console.log("currentUser: ", currentUser);

  const [colorMode, setColorMode] = useState("dark");
  const location = useLocation(); // Get the current location

  const [isActiveNav, setIsActiveNav] = useState(false);

  const toggleNavClass = () => {
    setIsActiveNav(!isActiveNav);
  };

  // Color mode switch
  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const bodyElement = document.body;
    bodyElement.classList.remove("light", "dark");
    bodyElement.classList.add(colorMode);
  }, [colorMode]);

  // Check if the user is signed in with a Google account
  const isGoogleAuth =
    currentUser && currentUser.providerData[0]?.providerId === "google.com";

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (isGoogleAuth && currentUser.providerData[0]?.photoURL) {
      setProfileImage(currentUser.providerData[0]?.photoURL);
    }
  }, [isGoogleAuth, currentUser]);

  return (
    <div className="NavSuper">
      <main className={`Navbar display ${isActiveNav ? "active" : ""}`}>
        <div className="NavSubM display">
          {currentUser && (
            <div className="prof_Nav display">
              <div className="nav-Prof display">
                {profileImage && (
                  <div className="profile display">
                    <div className="img">
                      <img src={profileImage} alt="Avatar" className="avatar" />
                    </div>
                    <p>{currentUser.displayName || "Person"}</p>
                    <p>{currentUser.email || "Person"}</p>
                  </div>
                )}

                {!isGoogleAuth && (
                  <div className="profile display">
                    <Profile />
                    <p className="email">
                      {currentUser ? currentUser?.email : "Person"}
                      mail
                    </p>
                    <Link
                      onClick={toggleNavClass}
                      to="/profile"
                      className="link display"
                    >
                      Edit profile
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="Navigation flexCol">
            <small>Navigation</small>
          </div>

          <Link
            className={`linkLog ${location.pathname === "/" ? "active" : ""}`}
            onClick={toggleNavClass}
            to="/"
          >
            Home
          </Link>

          <Link
            className={`linkLog ${
              location.pathname === "/contact-us" ? "active" : ""
            }`}
            onClick={toggleNavClass}
            to="/contact-us"
          >
            Contact Us
          </Link>
          <Link
            className={`linkLog ${
              location.pathname === "/how-to-use" ? "active" : ""
            }`}
            onClick={toggleNavClass}
            to="/how-to-use"
          >
            How To Use
          </Link>
          <Link
            className={`linkLog ${
              location.pathname === "/services" ? "active" : ""
            }`}
            onClick={toggleNavClass}
            to="/services"
          >
            Our Services
          </Link>
          <Link
            className={`linkLog ${
              location.pathname === "/about-us" ? "active" : ""
            }`}
            onClick={toggleNavClass}
            to="/about-us"
          >
            Our Company
          </Link>
          <Link
            className={`linkLog ${
              location.pathname === "/terms-policy" ? "active" : ""
            }`}
            onClick={toggleNavClass}
            to="/terms-policy"
          >
            Terms & Policies
          </Link>
          <Link
            className={`linkLog ${
              location.pathname === "/privacy-security" ? "active" : ""
            }`}
            onClick={toggleNavClass}
            to="/privacy-security"
          >
            Privacy and Security
          </Link>

          <Link
            className={`linkLog ${
              location.pathname === "/profile" ? "active" : ""
            }`}
            onClick={toggleNavClass}
            to="/profile"
          >
            Edit profile
          </Link>
          <Link
            className={`linkLog ${
              location.pathname === "/loggins" ? "active" : ""
            }`}
            onClick={toggleNavClass}
            to="/loggins"
          >
            You've <Loglength />
          </Link>

          {/*<div>
             <button className="Toggle btn" onClick={toggleColorMode}>
              {colorMode === "light" ? <FaMoon /> : <FaSun />}
            </button> 
          </div>*/}

          <div className="soc display">
            <a href="#/" className="sosLink display">
              <FaFacebook />
            </a>
            <a href="#/" className="sosLink display">
              <FaLinkedin />
            </a>
            <a href="#/" className="sosLink display">
              <FaGithub />
            </a>
          </div>
        </div>
      </main>
      <button
        className={`ToggleNavBtn ${isActiveNav ? "active" : ""}`}
        onClick={toggleNavClass}
      >
        {!isActiveNav ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
      </button>
    </div>
  );
}
