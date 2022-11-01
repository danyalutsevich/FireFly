import React, { useState, useEffect, useContext, useRef } from 'react';

import ProfileCSS from './Profile.module.scss';
import { auth, FirebaseContext, logout, uploadImage, removeImage } from '../../firebase-config';

export function Profile() {

  const { user } = useContext(FirebaseContext)

  console.log(user)
  let userPic = useRef(null)

  const fileSelected = async (e) => {
    let file = e.target.files[0];

    if (file) {
      uploadImage(file)
    }
    else {
      alert("No file selected")
    }
  }

  return (
    <div className={ProfileCSS.Profile}>
      <div className={ProfileCSS.ProfilePic}>
        {user?.photoURL == null ?
          <img src={"/defaultUserPic.svg"} alt="ProfileDefault" /> :
          <img src={user?.photoURL} alt="Profile" />
        }
        <input type='file' id="img" style={{ display: 'none' }} onChange={fileSelected} />
        <label htmlFor="img">Change Profile Image</label>
        <button onClick={removeImage}>Remove Image</button>
      </div>
      <div className={ProfileCSS.UserInfo}>
        <h2>Name: {user?.displayName}</h2>
        <h2>Email: {user?.email}</h2>
        <button onClick={logout}>Sign Out</button>
      </div>
    </div>
  )
}