import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { deleteUser } from "firebase/auth";
import { getDatabase, ref, remove } from "firebase/database";
import { auth, db } from "../../Firebase/firebase-config";
import "./SignOut.scss";
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();

  const logout = async () => {
    window.localStorage.removeItem("emailForSignIn");
    try {
      await signOut(auth);
      // alert("logout");
      navigate("/SignIn"); // Redirect to the specified page after logout
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const [loggins, setloggins] = useState([]);
  const deleteAccount = async () => {
    window.localStorage.removeItem("emailForSignIn");
    loggins.forEach((loggin) => {
      remove(ref(db, `${auth.currentUser.uid}/${loggin.uidd}`));
      setloggins([]);
    });
    try {
      const user = auth.currentUser;
      await deleteUser(user);

      // Clear user's real-time database
      const database = getDatabase();
      const userRef = ref(database, `users/${user.uid}`);
      await remove(userRef);

      navigate("/Confirm-Email"); // Redirect to the home page after deleting the account
    } catch (error) {
      console.log("error: ", error);
    }

    
  };

  return (
    <div className="signOut display">
      {/* Logout pop up */}
      {/* box 1 */}
      <div className="box signOutBtn display">
        <h1>Are you sure you want to logout of your account?</h1>
        <div className="btns display">
          <button onClick={logout}>Yes, Log me out</button>
        </div>
      </div>
      {/* box */}
      {/* Delete Account pop up */}
      {/* box 2 */}
      <div className="box deleteAccountBtn display">
        <h1>Are you sure you want to delete your account?</h1>
        <div className="btns display">
          <button onClick={deleteAccount}>Yes, Delete my account</button>
        </div>
      </div>
      {/* box */}
    </div>
  );
};

export default SignOut;