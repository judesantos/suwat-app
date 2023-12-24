'use client';

import { redirect, useRouter } from "next/navigation";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Button } from "./ui/button";

const handleSignIn = async (router:AppRouterInstance) => {
  const ok = await signInWithGoogle();
  if (ok)
    router.push("/dashboard")
}

const handleSignOut = async (router:AppRouterInstance) => {
  const ok = await signOut();
  if (ok) 
    router.push("/")
}

const SignInForm = ({
  variant
}: {
  variant: "sign-in" | "dashboard",
}) => {

  const router = useRouter();
  const buttonStyle = "bg-slate-500 mt-2 px-2 py-1 rounded-md text-slate-50";

  if (variant === "sign-in") {
    return (
      <>
        <Button 
          className={buttonStyle}
          onClick={async () => handleSignIn(router)}
        >
          Sign in with Google
        </Button>
        <Button 
          className={buttonStyle}
          onClick={async () => router.push("/")}
        >
          Cancel sign in
        </Button>
      </>
    ) 
  } else if (variant === "dashboard") {

    redirect("/dashboard")

  }
  
}

const SignOutForm = () => {

  const router = useRouter();
  const buttonStyle = "bg-slate-500 mt-2 px-2 py-1 rounded-md text-slate-50";

  return (
    <>
      <Button 
        className={buttonStyle}
        onClick={async () => handleSignOut(router)}
      >
        Sign out
      </Button>
      <Button 
        className={buttonStyle}
        onClick={async () => router.push("/dashboard")}
      >
        Cancel sign out
      </Button>
    </>
  ) 
  
}

export { SignInForm, SignOutForm };
