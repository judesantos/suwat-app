'use client';

import { providerSignIn } from "@/lib/client/auth";
import { redirect, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import googleImg from "@/public/img/brands/google.jpg";
import Link from "next/link";
import { saveSessionCredentials } from "@/lib/client/auth";
import { emailPasswordSignIn } from "@/lib/actions";
import { useFormState } from "react-dom";
import { findUser } from "@/lib/client/account";
import { User } from "@/lib/types";
import clsx from "clsx";
import { useState } from "react";

const buttonStyle = "text-white bg-indigo-600 rounded-md";

/**
 * handle provider auth through API through firebase client auth and redirect   
 * 
 * @param router 
 * @param provider 
 */
const handleGoogleSignIn = async (
  router: AppRouterInstance,
  provider: string
): Promise<{
  success:boolean, 
  message:string
}> => {

  const {success, credential} = await providerSignIn(provider)
  console.log({handleGoogleSignIn: {success, credential}})
  if (success && credential) {
    // Check if user has an account with us. If not, prompt to enroll.
    if (credential?.user?.email) {
      const user:User|undefined = await findUser(credential?.user?.email)
      if (!user) {
        return {success: false, message: "Not found"};
      }
      // Account exists. Save session...
      await saveSessionCredentials('external', credential, user.id);
      // Refresh server pages. Otherwise, back button shows cached private pages.
      router.refresh();
      // redirect to dashboard
      router.replace("/dashboard")
      return {success: true, message: "Success"};
    }
  }

  return {success: false, message: "Sign in failed"};
}

const SignInDialog = ({
  variant
}: {
  variant: "sign-in" | "dashboard",
}) => {

  const [state, dispatch] = useFormState(emailPasswordSignIn, {errors:{}});
  const [error, setError] = useState(false);
  const router = useRouter();

  const googleSignIn = async () => {
    const resp = await handleGoogleSignIn(router, 'google');
    if (!resp.success) {
      setError(true);
    }
  }

  if (variant === "sign-in") {
    return (
      <>
        <div className={clsx("absolute w-full h-10 top-10 text-center text-white bg-red-500", {
          "hidden": !error
        })}>
          <p className="h-full py-2">
            {"We couldn't find a user with the email that you provided. Would you like to "}
            <Link 
              href={"/sign-up"}>
              Sign up?
            </Link>
          </p>
        </div>
        <div
          className="w-1/3 h-3/4"
        >
          <div
            className="text-4xl font-normal text-gray-600 h-16 text-center"
          >
            Log in to your account
          </div>
          <div 
            className="space-y-2 w-full text-center px-14 mt-5"
          >
            <form action={dispatch}>
              <div className="space-y-4">
                <div
                  className="space-y-2"
                >
                <div>
                  Enter your email address and password
                </div>
                <Input 
                  id="email"
                  name="email"
                  required
                  className="border border-gray-300"
                  placeholder="email@company.com"
                />
                <p className="text-red-500 -mt-2">
                  {state?.errors?.email}
                </p>
                <Input 
                  id="password"
                  name="password"
                  required
                  placeholder="Password"
                  type="password"
                  className="border border-gray-300"
                />
                <p className="text-red-500 -mt-2">
                  {state?.errors?.password}
                  {state?.errors?.message}
                </p>
                </div> 
              </div>
              <Button
                type="submit"
                className={buttonStyle + " w-full space-x-2 mt-3"}
              >
                Sign in
              </Button>
              <div
                className="w-full p-2"
              >
                {"Forgot "}
                <Link 
                  className="text-blue-600"
                  href={"/forgot"}>password</Link>
                {"?"}
              </div>
            </form>
            <div className="flex flex-row w-full justify-center text-center py-6">
              <div className="w-1/3 mr-2 h-3 border-b-2"></div>
                Or Sign in with
              <div className="w-1/3 ml-2 h-3 border-b-2"></div>
            </div>
            <Button 
              className="w-1/3 border border-gray-300 p-5"
              onClick={googleSignIn}
            >
              <Image
                className="pr-2"
                width={23}
                height={23}
                src={googleImg} 
                alt="Login to Google" 
              />
              Google
            </Button>
            <div className="pt-5 space-y-1">
              <div
                className="w-full"
              >
                {"Don't have an account? "}
                <Link 
                  className="text-blue-600"
                  href={"/sign-up"}>Sign up</Link>
              </div>
              <div
                className="w-full"
              >
                {"Can't log in? "}
                <Link 
                  className="text-blue-600"
                  href={"/dashboard"}>Help</Link>
              </div>
            </div>
          </div>
        </div>
      </>
    ) 
  } else if (variant === "dashboard") {

    redirect("/dashboard")

  }
}

export default SignInDialog;
