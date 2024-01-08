import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
  signInWithPopup,
  signInWithRedirect
} from "firebase/auth";

import { auth } from "./firebase"
import { ApiResponse } from "../types";

const authenticate = async (provider: AuthProvider) => {

  try {

    const userCreds = await signInWithPopup(auth, provider);
    const idToken = await userCreds.user.getIdToken();

    const resp = await fetch('/api/sign-in', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ idToken })
    });

    const respBody = (await resp.json()) as unknown as ApiResponse<string>;
    return (resp.ok && respBody.success) ? true : false;

  } catch (e: any) {

    if (e.email && e.credential && e.code === "auth/account-exists-with-different-credential") {

      console.error( e.code )
      const methods: string[] = await fetchSignInMethodsForEmail(auth, e.email)
      const providerKey = methods[0].split('.')[0]

      if (providerKey === 'google') {

        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider);

      }

    } else {

      console.log(e);

    }

  }

  return false;
}

const signInWithGithub = async () => {
  return authenticate(new GithubAuthProvider());
}

const signInWithGoogle = async () => {
  return authenticate(new GoogleAuthProvider());
}

const signOut = async () => {

  try {
    await auth.signOut();

    const resp = await fetch('/api/sign-out', {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const respBody = (await resp.json()) as unknown as ApiResponse<string>;
    return (resp.ok && respBody.success) ? true : false

  } catch(e) {
    console.error(e);
  }

  return false;
}

export {
  signInWithGithub,
  signInWithGoogle,
  signOut
}
