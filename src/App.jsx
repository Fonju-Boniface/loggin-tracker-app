import { Link, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home/Home";

import RouteS from "./Pages/AddProduct/RouteS";
import SignInPage from "./Pages/Login/SignInPage";
import SignUp from "./Pages/Login/SignUp";
import ConEmail from "./Pages/Login/ConEmail";
import UseAuth from "./custom-hooks/UseAuth";
import Profile from "./Pages/Profile/Profile";
import AddTProduct from "./Pages/AddProduct/AddProduct";
import { ContactUs } from "./Pages/Contactus/ContactUs";
import Navbar from "./Component/Navbar/Navbar";
import { FaCircleXmark, FaSignInAlt } from "react-icons/fa";
import SignOut from "./Pages/Login/SignOut";
import Services from "./Pages/Services/Services";
import HowUse from "./Pages/HowUse/HowUse";
import AboutUs from "./Pages/AboutUs/AboutUs";
import TermPo from "./Pages/TermPo/TermPo";
import PriSecure from "./Pages/PriSecure/PriSecure";
import Footer from "./Pages/Footer/Footer";
import Scrolltob from "./Pages/Scrolltob/Scrolltob";
import { useState } from "react";

function App() {
  const currentUser = UseAuth();

  // const [isActiveNav, setIsActiveNav] = useState(false);

  // const toggleNavClass = () => {
  //   setIsActiveNav(!isActiveNav);
  // };
  return (
    <div className="App display">
      {/* routesActive  className={!currentUser ? "AppContainer routesActive " : "routesActive"}*/}

      {currentUser && (
        <Link to="/SignUp" className="SignUpIcon">
          <FaSignInAlt />
        </Link>
      )}
      <div
        className={
          !currentUser
            ? "AppContainer  display"
            : " AppContainer display routesActive"
        }
      >
        {currentUser && (
          <div>
            <Navbar />
          </div>
        )}
        <div className="routes display">
          <Routes>
            <Route path="/" element={<Home />} />
            {currentUser ? (
              <Route path="/home" element={<Home />} />
            ) : (
              <Route path="/home" element={<ConEmail />} />
            )}

            <Route path="/SignIn" element={<SignInPage />} />
            <Route path="/Confirm-Email" element={<ConEmail />} />
            <Route path="/Sign-Up" element={<SignUp />} />

            {currentUser ? (
              // <Route path="/home" element={<Home />} />
              <Route path="/sign-out" element={<SignOut />} />
            ) : (
              <Route path="/sign-out" element={<ConEmail />} />
            )}

            {currentUser ? (
              <Route path="/contact-us" element={<ContactUs />} />
            ) : (
              <Route path="/contact-us" element={<ConEmail />} />
            )}
            {currentUser ? (
              <Route path="/services" element={<Services />} />
            ) : (
              <Route path="/services" element={<ConEmail />} />
            )}

            {currentUser ? (
              <Route path="/about-us" element={<AboutUs />} />
            ) : (
              <Route path="/about-us" element={<ConEmail />} />
            )}
            {currentUser ? (
              <Route path="/how-to-use" element={<HowUse />} />
            ) : (
              <Route path="/how-to-use" element={<ConEmail />} />
            )}

            {currentUser ? (
              <Route path="/loggins" element={<AddTProduct />} />
            ) : (
              <Route path="/loggins" element={<ConEmail />} />
            )}
            {currentUser ? (
              <Route path="/terms-policy" element={<TermPo />} />
            ) : (
              <Route path="/terms-policy" element={<ConEmail />} />
            )}

            {currentUser ? (
              <Route path="/privacy-security" element={<PriSecure />} />
            ) : (
              <Route path="/privacy-security" element={<ConEmail />} />
            )}
            {currentUser ?(
              // <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            ):(
              
              <Route path="/profile" element={<ConEmail />} />
            )}

          </Routes>

          {currentUser && <Scrolltob />}
          {currentUser && <Footer />}
        </div>
      </div>
    </div>
  );
}

export default App;
