'use client';

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";

import { signInWithGithub, signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { StatusCode, User } from "@/lib/types";

import { SHA256 } from "crypto-js";
import { handleSignOut, providerSignIn, signUpUser } from "@/lib/action";
import googleImg from "@/public/img/brands/google.jpg";
import Image from "next/image";

const hashString = (clearText: string) => {
  return SHA256(clearText).toString();
}


const EnrollmentDialog = (props: any) => {

  const [user, setUser] = useState({} as User)
  const [signupError, setSignupError] = useState(false);
  const router = useRouter();

  const userEmail = props?.email;

  useEffect(() => {
    setUser(user => ({
      ...user, ...{email: userEmail}
    }))
  }, [userEmail]);
  
  const onInputChange = (key: string, value: string) => {
    switch (key) {
    case 'name':
      setUser(user => ({...user, ...{fullName: value}}))
      break;
    case 'password':
      setUser(user => ({...user, ...{password: value}}))
      break;
    case 'username':
      setUser(user => ({...user, ...{userName: value}}))
      break;
    default:
      break;
    }
  }

  const handleSignUp = async () => {

      const {status, message} = await signUpUser(user);
      if (status === StatusCode.SUCCESS) {

          router.replace("/sign-in")

      } else if (status === StatusCode.ACCOUNT_EXISTS) {
  
        setSignupError(true);

      } else {

      }
  }

  return (
    <div
      className="flex-row w-3/4 h-5/6 absolute bottom-0"
    >
      <div
        className="flex-row space-y-4"
      >
        <h1 
          className="flex-row font-semibold text-2xl text-gray-600"
        >
          Create your account
        </h1>
        {signupError && 
          <>
            <span
              className="font-semibold text-red-500"
            >
              {`Account exists for ${user.email}. `}
            </span>
            <Link
              href={"/sign-in"}
              className="text-blue-700"
            > 
              Sign in
            </Link>?
          </>
        }
      </div>
      <div
        className="flex-row space-y-7 w-9/12 mt-14"
      >
          <div className="space-y-1">
            <label>Full Name</label>
            <Input 
              className="border-2 border-slate-300"
              placeholder="Enter your full name"
              onChange={e => {
                onInputChange('name', e.target.value)
              }}
            />
          </div>
          <div className="space-y-1">
            <label>Password</label>
            <Input 
              className="border-2 border-slate-300"
              type="password"
              formEncType="true"
              placeholder="Enter at least 8 chars. Example: (aBc123@*$&)"
              onChange={e => {
                onInputChange('password', hashString(e.target.value))
              }}
            />
          </div>
          <div className="space-y-1">
            <label>Account name</label>
            <Input 
              className="border-2 border-slate-300"
              placeholder="Example, company, department, or your personal name"
              onChange={e => {
                onInputChange('username', e.target.value)
              }}
            />
          </div>
      </div>
      <div className="flex-row h-1/4">
        <div className="h-full text-end">
          <Button
            className="absolute bottom-16 right-3 text-md text-white bg-indigo-600 rounded-md space-x-11"
            onClick={async () => handleSignUp()}
          >
            Continue 
            <ArrowRightIcon className="h-5 w-5 space-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}


export {
  SignInDialog,
  SignOutDialog,
  SignUpDialog,
  EnrollmentDialog,
  SignInButton,
  SignOutButton,
  handleEnrollment
};
