import React, { useState, useEffect } from 'react';

import ProfileCSS from './Profile.module.scss';
import { CRUDexample } from './CRUDexample';
import { AuthExample } from './AuthExample';

export function Profile() {

  return (
    <div className={ProfileCSS.Profile}>
      <h2>Profile</h2>
      <AuthExample/>

      {/* <CRUDexample /> */}
    </div>
  )
}