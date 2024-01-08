'use client';

import { providerSignIn } from "@/lib/action";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import googleImg from "@/public/img/brands/google.jpg";
import Link from "next/link";
import { Input } from "../ui/input";

const buttonStyle = "text-white bg-indigo-600 rounded-md";

const handleEnrollment = async (router: AppRouterInstance, provider: string) => {

  if (!provider.length) {
    return redirect("/error");
  }

  if (provider !== 'account') {
    if (await !providerSignIn(provider)) {
      return redirect("/error")
    }
  } else {
    if (await !providerSignIn(provider)) {
      return redirect("/error")
    }
  }

  return router.replace("/sign-up/enrollment");
}


const SignUpDialog = () => {

  const [email, setEmail] = useState('');
  const router = useRouter();

  const onEmailInput = (e:any) => {
    setEmail(e.target.value)
    console.log({onEmailInput:email})
  }

  return (
    <div
      className="w-1/2 h-3/5 p-5"
    >
      <div 
        className="flex-row w-full space-y-3 text-center"
      >
        <div
          className="flex-row font-semibold text-4xl text-gray-600"
        >
          Welcome to Suwat.com
        </div>
        <div
          className="w-full text-center"
        >
          Get started. Signup for the Free tier
        </div>
      </div>
      <div
        className="text-center flex-row grid grid-cols space-y-3 w-full mt-14"
      >
        <Button 
          className="border-2 border-gray-200"
          onClick={async () => handleEnrollment(router, 'google')}
        >
          <Image
            className="pr-2"
            width={23}
            height={23}
            src={googleImg} 
            alt="Login to Google" 
          />
          Continue with Google
        </Button>
        <div className="flex flex-row w-full justify-center text-center">
          <div className="w-1/2 mr-2 h-3 border-b-2"></div>
            Or
          <div className="w-1/2 ml-2 h-3 border-b-2"></div>
        </div>
        <Input
          className="border-2 border-slate-300"
          placeholder="email@company.com"
          onChange={onEmailInput}
        />
        <Link 
          className="text-white bg-indigo-600 rounded-md h-10 p-2 align-middle text-center"
          href={"/sign-up/enrollment/"+email}
        >
          Continue
        </Link>
        <div className="space-y-1 pt-5">
          <div className="text-center">
            Already have an account? 
            <Link 
              className="text-blue-600"
              href={"/sign-in"}>
              {" Log in"}
            </Link>
          </div>
          <div
            className="text-center px-16 mx-2"
          >
            By proceeding, you agree to the 
            <Link 
              className="text-blue-600"
              href={"/terms-of-service"}
            >
              {" Terms of Service " } 
            </Link>
              and 
            <Link 
              className="text-blue-600"
              href={"/privacy-policy"}
            >
              {" Privacy Policy" }.
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default SignUpDialog;
