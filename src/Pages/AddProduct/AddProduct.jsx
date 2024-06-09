import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import FileCopyIcon from "@mui/icons-material/FileCopy";
import "./AddTProduct.scss";
import Loglength from "../../Component/Navbar/Loglength";
import Preloader from "../../Component/Navbar/Preloader";
import { FaBars, FaPlus, FaTrash, FaXmark } from "react-icons/fa6";
import { AiOutlineFieldNumber } from "react-icons/ai";

// Rest of the code...

export default function AddTProduct() {
  const [accountName, setAccountName] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [accountUrl, setAccountUrl] = useState("");
  const [accountDesc, setaccountDesc] = useState("");

  const [loggins, setloggins] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(true);
      if (user) {
        // Read logins
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setloggins([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).forEach((login) => {
              setloggins((oldArray) => [...oldArray, login]);
            });
          }
          setIsLoading(false);
        });
      } else {
        navigate("/home");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const writeToDatabase = () => {
    const uidd = uid();
    setIsLoading(true);

    const currentDate = new Date();

    let DateD = currentDate.getDate();

    if (DateD <= 9) {
      DateD = "0" + currentDate.getDate();
    } else {
      DateD = currentDate.getDate();
    }

    let DateM = currentDate.getMonth();

    if (DateM <= 9) {
      DateM = `0${currentDate.getMonth() + 1}`;
    } else {
      DateM = currentDate.getMonth() + 1;
    }

    const formattedDate = `${DateD}/${DateM}/${currentDate.getFullYear()}`;

    let TimeH = currentDate.getHours();

    if (TimeH <= 9) {
      TimeH = "0" + currentDate.getHours();
    } else {
      TimeH = currentDate.getHours();
    }

    let TimeM = currentDate.getMinutes();

    if (TimeM <= 9) {
      TimeM = "0" + currentDate.getMinutes();
    } else {
      TimeM = currentDate.getMinutes();
    }

    let TimeS = currentDate.getSeconds();

    if (TimeS <= 9) {
      TimeS = "0" + currentDate.getSeconds();
    } else {
      TimeS = currentDate.getSeconds();
    }
    const formattedTime = `${TimeH}:${TimeM}:${TimeS}`;

    if (
      accountName === "" ||
      accountEmail === "" ||
      accountPassword === "" ||
      accountUrl === "" ||
      accountDesc === ""
    ) {
      // alert("Please fill all the fields");
      document.getElementById("FormError").innerHTML =
        "Please fill all the fields";
      setIsLoading(true);
      return;
    } else {
      document.getElementById("FormError").innerHTML = " ";
    }

    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      accountName: accountName,
      accountEmail: accountEmail,
      accountPassword: accountPassword,
      accountUrl: accountUrl,
      accountDesc: accountDesc,
      uidd: uidd,
      date: formattedDate,
      time: formattedTime,
    });
    setAccountName("");
    setAccountEmail("");
    setAccountPassword("");
    setAccountUrl("");
    setaccountDesc("");
    setShowAddLoggin((prevState) => !prevState);
    setIsLoading(false);
  };

  const handleUpdate = (uidd) => {
    setShowAddLoggin((prevState) => !prevState);
    setIsEdit(true);
    const editloggin = loggins.find((loggin) => loggin.uidd === uidd);
    setAccountName(editloggin.accountName);
    setAccountEmail(editloggin.accountEmail);
    setAccountPassword(editloggin.accountPassword);
    setAccountUrl(editloggin.accountUrl);
    setaccountDesc(editloggin.accountDesc);
    setTempUidd(uidd);
  };

  const handleEditConfirm = () => {
    setShowAddLoggin((prevState) => !prevState);
    const currentDate = new Date();
    let DateD = currentDate.getDate();

    if (DateD <= 9) {
      DateD = "0" + currentDate.getDate();
    } else {
      DateD = currentDate.getDate();
    }

    let DateM = currentDate.getMonth();

    if (DateM <= 9) {
      DateM = `0${currentDate.getMonth() + 1}`;
    } else {
      DateM = currentDate.getMonth() + 1;
    }

    const formattedDate = `${DateD}/${DateM}/${currentDate.getFullYear()}`;

    let TimeH = currentDate.getHours();

    if (TimeH <= 9) {
      TimeH = "0" + currentDate.getHours();
    } else {
      TimeH = currentDate.getHours();
    }

    let TimeM = currentDate.getMinutes();

    if (TimeM <= 9) {
      TimeM = "0" + currentDate.getMinutes();
    } else {
      TimeM = currentDate.getMinutes();
    }

    let TimeS = currentDate.getSeconds();

    if (TimeS <= 9) {
      TimeS = "0" + currentDate.getSeconds();
    } else {
      TimeS = currentDate.getSeconds();
    }
    const formattedTime = `${TimeH}:${TimeM}:${TimeS}`;

    // const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      accountName: accountName,
      accountEmail: accountEmail,
      accountPassword: accountPassword,
      accountUrl: accountUrl,
      accountDesc: accountDesc,
      date: formattedDate, // Update the date
      time: formattedTime, // Update the time
    });

    setAccountName("");
    setAccountEmail("");
    setAccountPassword("");
    setAccountUrl("");
    setaccountDesc("");
    setIsEdit(false);
  };

  const handleDelete = (uidd) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uidd}`))
      .then(() => {
        setloggins((prevloggins) =>
          prevloggins.filter((loggin) => loggin.uidd !== uidd)
        );
      })
      .catch((error) => {
        console.error("Error deleting loggin:", error);
      });
  };

  const deleteAllloggins = () => {
    loggins.forEach((loggin) => {
      remove(ref(db, `${auth.currentUser.uid}/${loggin.uidd}`));
      setloggins([]);
    });
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    document.getElementById("CopyClipb").innerHTML =
      "Email Copied to clipboard";
    setIsActiveCopyClipb(!isActiveCopyClipb);

    setTimeout(() => {
      document.getElementById("CopyClipb").innerHTML = "";
      setIsActiveCopyClipb(isActiveCopyClipb);
    }, 1000);
  };
  const handleCopyToClipboardP = (textP) => {
    navigator.clipboard.writeText(textP);
    document.getElementById("CopyClipb").innerHTML =
      "Password Copied to clipboard";
    setIsActiveCopyClipb(!isActiveCopyClipb);

    setTimeout(() => {
      document.getElementById("CopyClipb").innerHTML = "";
      setIsActiveCopyClipb(isActiveCopyClipb);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    writeToDatabase(); // Call the function to handle form submission

    setIsLoading(true);
  };
  // State to toggle the visibility of the "add-loggin" section
  const [showAddLoggin, setShowAddLoggin] = useState(false);

  // ...

  const toggleAddLoggin = () => {
    // setIsLoading(true)

    setShowAddLoggin((prevState) => !prevState);
    setAccountName("");
    setAccountEmail("");
    setAccountPassword("");
    setAccountUrl("");
    setaccountDesc("");
  };

  const [searchQuery, setSearchQuery] = useState("");

  const [sortOption, setSortOption] = useState("alphabetical");

  let sortedLoggins = [...loggins];

  if (sortOption === "alphabetical") {
    sortedLoggins.sort((a, b) => a.accountName.localeCompare(b.accountName));
  } else if (sortOption === "ascending") {
    sortedLoggins.sort((a, b) =>
      a.accountName.localeCompare(b.accountName, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );
  } else if (sortOption === "descending") {
    sortedLoggins.sort((a, b) =>
      b.accountName.localeCompare(a.accountName, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );
  } else if (sortOption === "date") {
    sortedLoggins.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  const filteredLoggins = sortedLoggins.filter((loggin) =>
    loggin.accountName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [activeDiv, setActiveDiv] = useState(false);
  const [activeDel, setActiveDel] = useState(false);
  const ActiveDel = () => {
    setActiveDel(!activeDel)
  }

  const [visibleEmailLoggin, setVisibleEmailLoggin] = useState(null);
  const [visiblePasswordLoggin, setVisiblePasswordLoggin] = useState(null);

  // ...

  const handleToggleEmail = (uidd) => {
    setVisibleEmailLoggin((prevVisibleEmailLoggin) =>
      prevVisibleEmailLoggin === uidd ? null : uidd
    );
  };
  const handleTogglePassword = (uidd) => {
    setVisiblePasswordLoggin((prevVisiblePasswordLoggin) =>
      prevVisiblePasswordLoggin === uidd ? null : uidd
    );
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 130) {
      setaccountDesc(inputValue);
    } else {
      e.target.value = accountDesc;
    }
  };

  const [isActiveDrop, setIsActiveDrop] = useState(false);
  const [isActiveCopyClipb, setIsActiveCopyClipb] = useState(false);

  const toggleDrop = () => {
    setIsActiveDrop(!isActiveDrop);
  };

  const [isSuredelAll, setIsSuredelAll] = useState(false);

  const DelAllSure = () => {
    setIsSuredelAll(!isSuredelAll);
    setIsActiveDrop(!isActiveDrop);
  };

  return (
    <div className="Add-loggin-page display flexCol">
      {/* onclick on the btn below, add active class to the add-loggin */}

      {showAddLoggin && (
        <div className="empty display">
          <div className="add-loggin display flexCol">
            <form onSubmit={handleSubmit} className="form display flexCol">
              {" "}
              <div id="FormError"></div>
              {/* Add form element and onSubmit event handler */}
              <input
                type="text"
                placeholder="Account Name"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Account Email"
                value={accountEmail}
                onChange={(e) => setAccountEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Account Password"
                value={accountPassword}
                onChange={(e) => setAccountPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="Account URL"
                value={accountUrl}
                onChange={(e) => setAccountUrl(e.target.value)}
              />
              <div className="textarea">
                <textarea
                  value={accountDesc}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.target.value.length >= 130 && e.key !== "Backspace") {
                      e.preventDefault();
                    }
                  }}
                  placeholder="Account description..."
                ></textarea>
                <small>{accountDesc.length}/130 characters</small>
              </div>
            </form>

            {isEdit ? (
              <div
                className="confirm-icon icon-icon display"
                onClick={handleEditConfirm}
              >
                {/* <CheckIcon /> */}
                Save Changes
              </div>
            ) : (
              <div
                className="add-icon icon-icon display"
                onClick={writeToDatabase}
              >
                {/* <AddIcon />  */}
                Add Loggin
              </div>
            )}
          </div>
          <div className="emty display" onClick={toggleAddLoggin}>
            <p>Tab anywhere to exit</p>
          </div>
        </div>
      )}

      <div
        id="CopyClipb"
        className={`CopyClipb ${isActiveCopyClipb ? "active" : ""}`}
      ></div>

      <div className="header display">
        <div className=" sect  display">
          <button className="toggleAddLoggin display" onClick={toggleAddLoggin}>
            <FaPlus />
            <Loglength />
          </button>

          <div className="searchBar display">
            <input
              type="text"
              placeholder="Search by Account Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="toggleAddLoggin display" onClick={toggleDrop}>
            {!isActiveDrop ? <FaBars /> : <FaXmark />}
          </button>
        </div>

        <div className={`Drop display ${isActiveDrop ? "active" : ""}`}>
          <div className="sortDropdown display">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option onClick={toggleDrop} value="alphabetical">
                Alphabetical Order
              </option>
              <option onClick={toggleDrop} value="ascending">
                Ascending Order
              </option>
              <option onClick={toggleDrop} value="descending">
                Descending Order
              </option>
              <option onClick={toggleDrop} value="date">
                Date of Creation
              </option>
            </select>
          </div>

          <div onClick={DelAllSure} className="delete-all-btn display">
            <button className="display" >
              <FaTrash /> All
            </button>
            
          </div>
        </div>
      </div>




      <div className="allLoggings ">
        <div  onClick={DelAllSure} className={`dellAllEmpty ${isSuredelAll ? "active" : ""}`}></div>

      <div className={`deleteAllDiv ${isSuredelAll ? "active" : ""}`}>
        <h1><b>!!</b> WARNING</h1>
        <p className="display">Are You sure you want to <b>permenently</b> get rid of <Loglength />?</p>

        <div className="spans display">

        <button onClick={DelAllSure} className="display">
              Not Sure
            </button>
        <button className="display" onClick={deleteAllloggins}>
              <FaTrash /> Permenently
            </button>
        </div>
      </div>
















        {filteredLoggins.map((loggin) => (
          <div key={loggin.uidd} className="allLogMain display">
            <div className="Mainchild display flexCol">
              {/* name and toggle dropdown */}
              <div className="display sub flexCol">
                <div className="display flexCol its">
                  <small>Account Name</small>
                  <p>{loggin.accountName}</p>
                </div>

                {/* ============ Email ========== */}
                <div className="display flexCol its">
                  <small>Account Email</small>
                  <p>
                    <span>
                      {visibleEmailLoggin === loggin.uidd
                        ? loggin.accountEmail
                        : "*****"}
                    </span>
                    <div className="icons display">
                      {visibleEmailLoggin === loggin.uidd ? (
                        <FaEyeSlash
                          onClick={() => handleToggleEmail(loggin.uidd)}
                          className="icon"
                        />
                      ) : (
                        <FaEye
                          onClick={() => handleToggleEmail(loggin.uidd)}
                          className="icon"
                        />
                      )}
                    </div>
                  </p>
                </div>
                {/* ============ password ========== */}
                <div className="display flexCol its">
                  <small>Account Password</small>
                  {/* see password */}
                  <p>
                    <span>
                      {visiblePasswordLoggin === loggin.uidd
                        ? loggin.accountPassword
                        : "*****"}
                    </span>
                    <div className="icons display">
                      {visiblePasswordLoggin === loggin.uidd ? (
                        <FaEyeSlash
                          onClick={() => handleTogglePassword(loggin.uidd)}
                          className="icon"
                        />
                      ) : (
                        <FaEye
                          onClick={() => handleTogglePassword(loggin.uidd)}
                          className="icon"
                        />
                      )}
                    </div>
                  </p>
                </div>
              </div>

              {/* ============ url link ========== */}
              <div className="display sub flexCol">
                <a
                  className="display its"
                  target="_blank"
                  href={loggin.accountUrl}
                  rel="noreferrer"
                >
                  {" "}
                  follow link...
                </a>
              </div>
            </div>

            <div
              className={
                activeDiv === loggin.uidd
                  ? "theOthers active display flexCol "
                  : " theOthers"
              }
            >
              <div className="spans theOspan display" onClick={ActiveDel}>
                <span
                  className="span"
                  onClick={() => setActiveDiv(loggin.uidd)}
                >
                  ...
                </span>

                <span className="span" onClick={() => setActiveDiv()}>
                  +++
                </span>
              </div>

              
                <div className="showdiv display flexCol ">
                  <div className="pair display flexCol">
                    <small>Description</small>
                    <p>{loggin.accountDesc}</p>
                  </div>

                  <div className="pair display">
                    {/* copy email */}
                    <div
                      className="copy-icon display"
                      onClick={() => handleCopyToClipboard(loggin.accountEmail)}
                    >
                      {loggin.accountName && (
                        <span>
                          <b> Email</b> <FileCopyIcon className="icon" />
                        </span>
                      )}
                    </div>

                    {/* copy password */}
                    <div
                      className="copy-icon display"
                      onClick={() =>
                        handleCopyToClipboardP(loggin.accountPassword)
                      }
                    >
                      {/* {handleCopyToClipboard(loggin.accountPassword) && <b>copied</b>} */}
                      {loggin.accountName && (
                        <span>
                          <b> password</b> <FileCopyIcon className="icon" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ===== Edit and delete btns */}
                  {loggin.accountName && (
                    <div className="pair display">
                      <div onClick={() => handleUpdate(loggin.uidd)} className="copy-icon display">
                        <span>
                          <b>Edit</b>
                        </span>
                      </div>
                      <div onClick={() => setActiveDel(loggin.uidd)} className="copy-icon display">
                        {/* < */}
                        <span>
                          <b>Delete</b>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* ========== Date and time ======== */}
                  <div className="pair display">
                    <p>{loggin.date}</p>
                    <p> {loggin.time}</p>
                  </div>
                </div>
              
                  
                    <div className={
                      activeDel === loggin.uidd
                        ? "Divdelete active display flexCol "
                        : " Divdelete"
                    }>
                      <p>
                        Are You sure you want to delete your
                        <b> {loggin.accountName} </b>
                        loggin details?
                      </p>
                      <small>
                        note this loggin will be deleted permenently
                      </small>

                      <div className="spans display">
                        <span
                          className="spa"
                          onClick={() => setActiveDel(!loggin.uidd)}
                        >
                          <b>No</b>
                        </span>
                        <span
                          className="spa"
                          onClick={() => handleDelete(loggin.uidd)}
                        >
                          <b>Continue</b>
                        </span>
                      </div>
                    </div>
                 
           
            </div>
          </div>
        ))}

        {isLoading && <Preloader />}

        {!isLoading && loggins.length === 0 && (
          <p>
            You have no logins yet. Click the Add Login button to create one.
          </p>
        )}
        {!isLoading && filteredLoggins.length === 0 && loggins.length > 0 && (
          <p>{`The "${searchQuery}" searched word not found`}</p>
        )}
      </div>

      <hr />
    </div>
  );
}
