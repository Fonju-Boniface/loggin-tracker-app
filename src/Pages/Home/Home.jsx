import React, { useState } from "react";
import { Link } from "react-router-dom";
import UseAuth from "../../custom-hooks/UseAuth";
import { FaCircleXmark } from "react-icons/fa6";
import HomeImg from "../../assets/Loggin-Logo.png";
import "./Home.scss";
import Login from "../Login/Testy";
import Profile from "../Profile/Profile";
import Loglength from "../../Component/Navbar/Loglength";


const Home = () => {
  const currentUser = UseAuth();
  console.log("currentUser: ", currentUser);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
// Check if the user is signed in with a Google account
const isGoogleAuth =
currentUser && currentUser.providerData[0]?.providerId === "google.com";

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };
  const handleLoginClickOff = () => {
    setIsLoginOpen(false);
  };

  return (
    <div 
    className= "Home display ">
      {isLoginOpen && (
        <div className="Signout_form">
          {!currentUser && (
            <div className="Herobtn">
              <FaCircleXmark className="Xmark" onClick={handleLoginClickOff} />
            </div>
          )}

          {!currentUser && <Login />}
          {currentUser && (
            <div className="Sect SignInSuc display">
              <h1>You are now signedIn</h1>
              <div className="display">
                <button onClick={handleLoginClickOff} className="link">
                  All Done
                </button>

                <Link to="/SignIn" className="link">Sign In</Link>
              </div>
            </div>
          )}
        </div>
      )}

      <div className={!currentUser ? "Image display outline" : "Image display"}>
        <img src={HomeImg} alt="Image" />
      </div>
      
      <div className="content display ">
        {currentUser && (
          <div>

            {isGoogleAuth && (
              <p>{currentUser ? currentUser?.displayName : "Person"}</p>
              
            )}
            {!isGoogleAuth && (
              <div className="isLocalAc">
                <Profile/>
                
              </div>
              
            )}
          </div>

          )}
        {!currentUser && (
          <h5 className={!currentUser ? "ha" : ""}>Hii there!!!</h5>
        )}
        {/* <p>{currentUser ? currentUser?.displayName : "Person"}</p> */}
        {currentUser && (
        <h1 className={!currentUser ? "h1" : "h11"}>
          your <b>Loggin-Tracker</b>
        </h1>
        )}
        {!currentUser && (
        <h1 className={!currentUser ? "h1" : "h11"}>
          Welcome To <b>Loggin-Tracker</b>
        </h1>
          
        )}
        <br />
        <p className={!currentUser ? "para" : ""}>
          In the digital age, we often find ourselves burdened with numerous
          online tasks, necessitating the creation of multiple accounts to
          access the resources we need. Consequently, we are left grappling with
          the challenge of remembering a plethora of login credentials, leading
          to inevitable forgetfulness over time. What if you suddenly find
          yourself unable to recall a crucial account? Would you resort to
          creating a new one, risking the loss of valuable data, work, progress,
          and popularity associated with the original? Does the thought of
          managing all your online logins cause you anxiety 
          <strong>
             ? Well Today, we present you with the ultimate solution: <br />
            <b className={!currentUser ? "display bold" : "display"}>
              Store just one login in your memory, and effortlessly access all
              your other logins.
            </b>
          </strong>
        </p>
      </div>

      <div className="Home_bts display">
        {/* if the user is loggedIn,  */}
        {currentUser && (
          <Link to="/loggins" className="link">
            {/* Add a login (<b>0</b>) */}
            <Loglength/>
          </Link>
          
        )}

        {!currentUser && (
          <Link to="/Sign-Up" className={!currentUser ? "noLog " : "link"}>
            Create account to get started
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
