import { useEffect, useState } from "react";
import { auth, upload, db } from "../../Firebase/firebase-config.js";
import { getDatabase, ref, set, onValue } from "firebase/database";
import imgas from "../../assets/about03.png";
import "./Profile.scss";
import { FaCamera } from "react-icons/fa";
import UseAuth from "../../custom-hooks/UseAuth";

export default function Profile() {
  const currentUser = auth.currentUser;
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUpdated, setImageUpdated] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const [username, setUsername] = useState("");

  // alert
  const CurrentUser = UseAuth();
  console.log("currentUser: ", CurrentUser);
  // Check if the user is signed in with a Google account
  const isGoogleAuth =
    currentUser && currentUser.providerData[0]?.providerId === "google.com";

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (isGoogleAuth && currentUser.providerData[0]?.photoURL) {
      setProfileImage(currentUser.providerData[0]?.photoURL);
    }
  }, [isGoogleAuth, currentUser]);

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  async function handleClick() {
    await upload(photo, currentUser, setLoading);
    setImageUpdated(true);
  }

  async function handleUsernameSubmit() {
    const userRef = ref(db, `users/${currentUser.uid}`);
    await set(userRef, { username: username }); // Update the username in the database
  }

  async function fetchUsername() {
    const userRef = ref(db, `users/${currentUser.uid}`);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData && userData.username) {
        setUsername(userData.username);
      }
    });
  }

  useEffect(() => {
    if (currentUser) {
      fetchUsername();
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <div className="MainProfile display flexCol">
      {/* <img src={imgas} alt="Avatar" className="avatar remove" /> */}
      {/* <img src={photoURL} alt="Avatar" className="avatar " /> */}
      <h5 className="remove">
        {" "}
        <b>Hi!!</b> {username}
      </h5>

      <div className="ImgName display flexCol">
        <div className="img display">
          {!isGoogleAuth && (
            <img src={photoURL} alt="Avatar" className="avatar" />
          )}
          

          {profileImage && (
            <img src={profileImage} alt="Avatar" className="avatar" />
          )}
        </div>
        {!isGoogleAuth && <p>{username}</p>}
        {isGoogleAuth && (
          <p>{currentUser ? currentUser?.displayName : "Person"}</p>
        )}
      </div>

      <div className="filessssss ">
        {!isGoogleAuth && (
          <div className="inputs display">
            <div className="inptname display flexCol">
              <label htmlFor="filepload" className="display">
                <FaCamera />
                <input type="file" onChange={handleChange} id="file-upload" />
              </label>

              <button className="display" onClick={handleClick}>
                Save changes
              </button>
            </div>

            <div className="inptname display flexCol">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />

              <button className="display" onClick={handleUsernameSubmit}>
                Save Changes
              </button>
            </div>
          </div>
        )}
        {isGoogleAuth && (
          <h1>
            YOU CANNOT EDIT THIS PROFILE BECAUSE YOU LOGGED IN WITH A GOOGLE
            ACCOUNT
          </h1>
        )}
      </div>

      {imageUpdated && (
        <div className="Pupsucces display">
          <p>Image updated successfully</p>
          <button onClick={() => window.location.reload()}>Done</button>
        </div>
      )}
    </div>
  );
}
