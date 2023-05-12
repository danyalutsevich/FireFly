import React, { useState, useEffect, useContext, useRef } from "react";
import ProfileCSS from "./Profile.module.scss";
import {
  auth,
  FirebaseContext,
  logout,
  uploadImage,
  removeImage,
  updateName,
  deleteUserAccount,
} from "../../firebase-config";

export function Profile() {
  const { user } = useContext(FirebaseContext);
  const [name, setName] = useState(user?.displayName);

  useEffect(() => {
    setName(user?.displayName);
    document.title = "Profile: " + user?.displayName;
  }, [user]);

  const fileSelected = async (e) => {
    let file = e.target.files[0];
    await uploadImage(file);
  };

  return (
    <div className={ProfileCSS.Profile}>
      <div className={ProfileCSS.LeftArea}>
        {user?.photoURL ? (
          <img src={user?.photoURL} alt={user.displayName + " profile pic"} />
        ) : (
          <img src={"/defaultUserPic.svg"} alt="Profile Default Picture" />
        )}
        <input
          type="file"
          accept="image/png, image/jpeg"
          id="img"
          style={{ display: "none" }}
          onChange={fileSelected}
        />
        <label htmlFor="img">
          <b>Change profile photo</b>
        </label>
        <button onClick={removeImage}>
          <b>Remove Image</b>
        </button>
        <button onClick={deleteUserAccount}>
          <b>Delete Account</b>
        </button>
      </div>
      <div className={ProfileCSS.RightArea}>
        <div className={ProfileCSS.UserDescription}>
          <h2>
            <b>Name :</b>
          </h2>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button
            onClick={() => {
              updateName(name);
            }}
          >
            Change
          </button>
        </div>
        <div className={ProfileCSS.UserDescription}>
          <h2>
            <b>Email:</b>
          </h2>
          <input value={user?.email} disabled={true} />
        </div>
        <button className={ProfileCSS.SignOutBtn} onClick={logout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
