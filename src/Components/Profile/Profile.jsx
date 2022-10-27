import React, { useState, useEffect, useContext } from 'react';

import ProfileCSS from './Profile.module.scss';
import {auth, FirebaseContext} from '../../firebase-config';
import { CRUDexample } from './CRUDexample';
import { AuthExample } from './AuthExample';

export function Profile() {

  const contextVal = useContext(FirebaseContext)

  return (
    <div className={ProfileCSS.Profile}>
      <h2>Profile</h2>
      <h2>{JSON.stringify(contextVal)}</h2>
      {/* <AuthExample/> */}
      {/* <CRUDexample /> */}
    </div>
  )
}