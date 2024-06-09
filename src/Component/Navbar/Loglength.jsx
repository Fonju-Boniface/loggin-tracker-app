import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";

// import "./AddTProduct.scss";

export default function Loglength() {
  const [loggins, setloggins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setloggins([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).forEach((loggin) => {
              setloggins((oldArray) => [...oldArray, loggin]);
            });
          }
        });
      } else {
        navigate("/home");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  let logginLengthElement;
  if (loggins.length === 0) {
    logginLengthElement = <div className="logginLength">00 <i>loggins</i></div>;
  } else if (loggins.length > 1 && loggins.length <= 9) {
    logginLengthElement = <div className="logginLength">0{loggins.length} <i>loggins</i></div>;
  } else if (loggins.length === 1) {
    logginLengthElement = <div className="logginLength">0{loggins.length} <i>loggin</i></div>;
  } else {
    logginLengthElement = <div className="logginLength">{loggins.length} <i>loggins</i></div>;
  }

  return (
    <div className="log">
      {logginLengthElement}
    </div>
  );
}