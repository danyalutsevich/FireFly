import React, { useState, useEffect, useContext, useRef } from 'react';

import ProfileCSS from './Profile.module.scss';
import { auth, FirebaseContext, logout, uploadImage, removeImage, updateName, deleteUserAccount } from '../../firebase-config';

export function Profile() {

  const { user } = useContext(FirebaseContext)
  const [name, setName] = useState(user?.displayName);

  useEffect(() => {
    setName(user?.displayName)
  }, [user]);

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
        {user?.photoURL ?
          <img src={user?.photoURL} alt="Profile" /> :
          <img src={"/defaultUserPic.svg"} alt="ProfileDefault" />
        }
        <input type='file' id="img" style={{ display: 'none' }} onChange={fileSelected} />
        <label htmlFor="img">Change Profile Image</label>
        <button onClick={removeImage}>Remove Image</button>
        <button onClick={deleteUserAccount}>Delete Account</button>
      </div>
      <div className={ProfileCSS.UserInfo}>
        <div className={ProfileCSS.UserDescription} >
          <h2>Name :</h2>
          <input value={name} onChange={e => { setName(e.target.value) }} />
          <button onClick={() => { updateName(name) }}>Change</button>
        </div>
        <div className={ProfileCSS.UserDescription}>
          <h2>Email:</h2>
          <input value={user?.email} disabled={true} />
        </div>
        <button onClick={logout}>Sign Out</button>
      </div>
    </div>
  )
}