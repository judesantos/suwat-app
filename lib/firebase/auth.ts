import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { ApiResponse } from "../types";
import { auth } from "@/lib/firebase/firebase";

const signInWithGoogle = async () => {

  const provider = new GoogleAuthProvider();

  try {

    const userCreds = await signInWithPopup(auth, provider);
    const idToken = await userCreds.user.getIdToken();

    const resp = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ idToken })
    });

    const respBody = (await resp.json()) as unknown as ApiResponse<string>;
    return (resp.ok && respBody.success) ? true : false;

  } catch(e) {
    console.error(e);
  }

  return false;
}

const signOut = async () => {

  try {
    await auth.signOut();

    const resp = await fetch('/api/auth/sign-out', {
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
  signInWithGoogle,
  signOut
}
