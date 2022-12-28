import { signInWithGoogle } from "../../firebase-config";

import SignInCSS from "./SignInWithGoogle.module.scss";

export function SignInWithGoogle() {
  return (
    <div className={SignInCSS.GoogleSignIn} onClick={signInWithGoogle} cookiePolicy='single-host-origin'>
      <div className={SignInCSS.Wrapper}>
        <img
          className={SignInCSS.Icon}
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
      </div>
      <p className={SignInCSS.Text}>Sign in with Google</p>
    </div>
  );
}
