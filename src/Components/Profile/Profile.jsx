import React, { useState, useEffect, useContext } from 'react';

import ProfileCSS from './Profile.module.scss';
import { auth, FirebaseContext, logout } from '../../firebase-config';
import { CRUDexample } from './CRUDexample';
import { AuthExample } from './AuthExample';

export function Profile() {

  const contextVal = useContext(FirebaseContext)

  return (
    <div className={ProfileCSS.Profile}>
      <h2>Profile</h2>
      <button onClick={logout}>Sign Out</button>
    </div>
  )
}