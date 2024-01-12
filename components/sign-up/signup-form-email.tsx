'use client';

import { providerSignIn } from "@/lib/client/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Button } from "../ui/button";
import Image from "next/image";
import googleImg from "@/public/img/brands/google.jpg";
import Link from "next/link";
import { Input } from "../ui/input";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Direction, UserForm } from "./signup-main";

import z from 'zod';
import { useState } from "react";
import clsx from "clsx";
import { AppResponse, StatusCode } from "@/lib/types";
import { useRouter } from "next/navigation";

const buttonStyle = "text-white bg-indigo-600 rounded-md";

const formValidator = () => {

  const invalid_type_error = 'Invalid entry';
  const required_error = 'Field is empty';
  const EmailFormSchema = z.object({
    email: z.string({
      invalid_type_error, required_error
    })
    .email("Please enter a valid email")
    .min(3, "Email entry too short")
    .max(132, "Maximum email length exceeded")
  });

  return EmailFormSchema;
}

const SignUpFormEmail = ({
  user,
  dispatch,
  setCurrentTab
}: {
  user: UserForm,
  dispatch: ({})=>void,
  setCurrentTab: (direction:Direction)=>void
}) => {

  const router = useRouter();

  const schemaValidator = formValidator();
  const [errors, setErrors] = useState<z.inferFlattenedErrors<typeof schemaValidator>>(); 

  let providerValidationFailed: AppResponse = {status: StatusCode.SUCCESS};

  const clearValidation = () => {
    if (user?.email?.length && errors?.fieldErrors?.email?.length) {
      setErrors(undefined);
    }
  }

  const onEmailInput = (e:any) => {
    dispatch({type: "SET_EMAIL", email: e.target.value})
  }

  const handleEnrollment = async (router: AppRouterInstance, provider: string) => {
    const {success, credential} = await providerSignIn(provider)
    if (!success || !credential) {
       return providerValidationFailed = {status: StatusCode.FAILED, message: 'Authenticaion failed'};
    }
    // Update local state 
    dispatch({type: "SET_EMAIL", email: credential.user.providerData[0].email})
    dispatch({type: "SET_PROVIDER_ID", providerId: credential.user.providerData[0].providerId})
    // Get some more info from user
    setCurrentTab(Direction.NEXT);
  }

  const loadNextForm = () => {
    // validate before submission
    const validation = schemaValidator.safeParse(user);
    if (validation.success) {
      // Valid! Move to the next form
      setCurrentTab(Direction.NEXT);
    } else {
      // Failed. try again
      setErrors(validation.error.flatten())
    }
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
          className="border border-gray-300"
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
        {providerValidationFailed.status !== StatusCode.SUCCESS && (
          <span className="text-red-500">
            {providerValidationFailed.message}
          </span>
        )}
        <div className="flex flex-row w-full justify-center text-center">
          <div className="w-1/2 mr-2 h-3 border-b-2"></div>
            Or
          <div className="w-1/2 ml-2 h-3 border-b-2"></div>
        </div>
        <Input
          required
          className="border border-gray-300"
          placeholder="email@company.com"
          onChange={(e)=>onEmailInput(e)}
          onKeyDown={()=>clearValidation()}
        />
        <span className={clsx("text-red-500", {
            "hidden": !errors?.fieldErrors?.email
          })}
        >
          {errors?.fieldErrors['email']?.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </span>
        <Button 
          className="text-white bg-indigo-600 rounded-md h-10 p-2 align-middle text-center"
          onClick={loadNextForm}
        >
          Continue
          <ArrowRightIcon className="h-5 w-5 space-x-1" />
        </Button>
        <div className="space-y-1 pt-5">
          <div className="text-center">
            Already have an account? 
            <Link 
              className="text-blue-600"
              href={"/sign-in"}>
              {" Sign in"}
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

export default SignUpFormEmail;
