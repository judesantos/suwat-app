'use client';

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { signInWithGithub, signInWithGoogle } from "./firebase/auth";
import { ApiResponse, AppResponse, DbError, DbStatusCode, StatusCode, User } from "./types";
import { signOut } from "@/lib/firebase/auth";

const signUpUser = async (user: User): Promise<AppResponse> => {

  const resp = await fetch('/api/sign-up', {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user })
  });

  const response = (await resp.json()) as unknown as ApiResponse;

  console.log({signUpUser: response})

  if (response.success) {
    return {status: StatusCode.SUCCESS};
  }

  if (response.error) {

    const dbErr:DbError|undefined = response.error as DbError;

    if (dbErr && dbErr.code && dbErr.code === DbStatusCode.UNIQUE_ENTRY_VIOLATION) {

      return {
        status: StatusCode.ACCOUNT_EXISTS,
        message: "You already have an account. Please sign in to your account."
      };

    }
  }

  return {
    status: StatusCode.FAILED,
    message: "Unknown Error"
  };
}

const providerSignIn = async (provider: string) => {

  let status: boolean = false;

  if ("google" === provider) {

    status = await signInWithGoogle();

  } else if ("github" === provider) {

    status = await signInWithGithub();

  }

  return status;
}

const handleSignOut = async (router: AppRouterInstance) => {
  const ok = await signOut();
  if (ok) 
    router.replace("/")
  // Refresh server pages. Otherwise, back button shows cached private pages.
  router.refresh();
}


export {
  signUpUser,
  providerSignIn,
  handleSignOut
}