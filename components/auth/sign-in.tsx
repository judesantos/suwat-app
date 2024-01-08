'use client';

import { handleSignOut, providerSignIn } from "@/lib/action";
import { redirect, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import googleImg from "@/public/img/brands/google.jpg";
import Link from "next/link";

const buttonStyle = "text-white bg-indigo-600 rounded-md";

const handleSignIn = async (router: AppRouterInstance, provider: string) => {

  const status = await providerSignIn(provider)

  if (status) {
    router.replace("/dashboard")
  }
  // Refresh server pages. Otherwise, back button shows cached private pages.
  router.refresh();

}

const SignInButton = async ({style}: {style:string}) => {

  const router = useRouter();

  return (
    <Button 
      className={style}
      onClick={async () => handleSignOut(router)}
    >
      Sign In
    </Button>
  )
}

const SignInDialog = ({
  variant
}: {
  variant: "sign-in" | "dashboard",
}) => {

  const router = useRouter();
  const cancelBtnStyle = buttonStyle + " mt-15";

  if (variant === "sign-in") {
    return (
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
          <label>
            Enter your email address
          </label>
          <div className="space-y-4">
            
            <Input 
              className="text-center border-2 border-slate-300"
              placeholder="email@company.com"
            />
            <Button
              className={buttonStyle + " w-full space-x-2"}
            >
              Next
              <ArrowRightIcon className="w-5 h-5"/>
            </Button>
          </div>
          <div className="flex flex-row w-full justify-center text-center py-6">
            <div className="w-1/3 mr-2 h-3 border-b-2"></div>
              Or Sign in with
            <div className="w-1/3 ml-2 h-3 border-b-2"></div>
          </div>
          <Button 
            className="w-1/3 border-2 border-slate-300"
            onClick={async () => handleSignIn(router, 'google')}
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
              {"Don't have an account yet? "}
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
    ) 
  } else if (variant === "dashboard") {

    redirect("/dashboard")

  }
  
}

export default SignInDialog;

export {
  SignInButton
}
