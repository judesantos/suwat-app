'use client';

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { signInWithGithub, signInWithGoogle } from "../firebase/auth";
import { ApiResponse, AppResponse, DbError, DbStatusCode, ServerErrorResponse, User, StatusCode, SessionCredential } from "../types";
import { UserCredential } from "firebase/auth";
import { auth } from "../firebase/firebase"

const signUpUser = async (user: User): Promise<AppResponse> => {

  const resp = await fetch('/api/account/sign-up', {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user })
  });

  const response = (await resp.json()) as unknown as ApiResponse;

  if (response.success) {
    return {status: StatusCode.SUCCESS};
  }

  if (response.error) {

    const dbErr:DbError|undefined = response.error as DbError;

    if (dbErr) {
      if (dbErr.code && dbErr.code === DbStatusCode.UNIQUE_ENTRY_VIOLATION) {
        return {
          status: StatusCode.ACCOUNT_EXISTS,
          message: "You already have an account. Please sign in to your account."
        };
      } 
    }
  }

  return ServerErrorResponse.UNKNOWN_ERROR;
}

const providerSignIn = async (
  provider: string
): Promise<{
  success: boolean,
  credential?: UserCredential
}> => {

  if ("google" === provider) {

    return await signInWithGoogle();

  } else if ("github" === provider) {

    return await signInWithGithub();

  }

  return {success: false};
}

const handleSignOut = async (router: AppRouterInstance) => {
  const ok = await signOut();
  if (ok) 
    router.replace("/")
  // Refresh server pages. Otherwise, back button shows cached private pages.
  router.refresh();
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

const saveSessionCredentials = async (
  type: 'external'|'internal',
  creds: SessionCredential
) => {

    let idToken = undefined;
    if (type === 'external') {
      idToken = await creds.user.getIdToken();
    } else {
      // internal credential
      idToken = '';
    }
    // Save our session. Send to server.
    const resp = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({type, idToken})
    });

    const respBody = (await resp.json()) as unknown as ApiResponse<string>;
    if (resp.ok && respBody.success) {

      const data = {
        email: (type === 'external' ? creds.user.providerData[0].email : 'email'),
        providerId: (type === 'external' ? creds.user.providerData[0].providerId : '')
      };

      return {status: StatusCode.SUCCESS, data};

    } else {

      return {
        status: StatusCode.FAILED,
        message: respBody.error
      }
    }
}

export {
  signUpUser,
  providerSignIn,
  handleSignOut,
  signOut,
  saveSessionCredentials,
}