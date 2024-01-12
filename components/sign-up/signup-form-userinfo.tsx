'use client';

import { AppResponse, StatusCode, UserAuthProvider } from "@/lib/types";
import { User } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

import z from 'zod';
import clsx from "clsx";
import { UserForm } from "./signup-main";
import { signUpUser } from "@/lib/client/auth";
import { hashString } from "@/lib/utils";

const formValidator = () => {
  /* password rule:
    at least 1 uppercase character (A-Z)
    at least 1 lowercase character (a-z) 
    at least 1 digit (0-9) 
    at least 1 special character — treat space as special characters
    min. 10 characters
    max 128 characters
    not more than 2 identical characters in a row (Ex.: 111 not allowed)
  */
  const UserFormSchema = z.object({
    fullName: z.string({required_error: "Full name is required"})
      .min(3, "Min. 3 chars required")
      .max(50, "Exceeds 50 char limit")
      .optional(),
    userName: z.string({required_error: "Username is required"})
      .min(3, "Min. 3 chars required")
      .max(50, "Exceeds 50 char limit"),
    password: z.string({required_error: "Password is required"})
      .min(8, 'Min. 8 chars required')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,127}$/,
        "Invalid password"
      ),
    phone: z.string({required_error: "Phone number is required"})
      .regex(
        /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
        "Invalid phone code"
      )
      .min(8, "Phone number minimum is 8 digits")
  });

  return UserFormSchema;
}

const SignUpFormUserInfo = ({
  user,
  dispatch,
}: {
  user: UserForm,
  dispatch: ({})=>void,
}) => {

  const router = useRouter();
  const [tooltip, setToolTip] = useState(false);
  const [signupError, setSignupError] = useState({status: StatusCode.SUCCESS} as AppResponse);

  const schemaValidator = formValidator();
  const [errors, setErrors] = useState<z.inferFlattenedErrors<typeof schemaValidator>>(); 

  const clearValidation = (field:string) => {
    if (field === 'fullName' && user?.fullName?.length && errors?.fieldErrors?.fullName?.length) {
      errors.fieldErrors.fullName = [];
    } else if (field === 'userName' && user?.userName?.length && errors?.fieldErrors?.userName?.length) {
      errors.fieldErrors.userName = [];
    } else if (field === 'password' && user?.password?.length && errors?.fieldErrors?.password?.length) {
      errors.fieldErrors.password = [];
    } else if (field === 'phone' && user?.phone?.length && errors?.fieldErrors?.phone?.length) {
      errors.fieldErrors.phone = [];
    }

    setToolTip(false);
  }

  const onInputChange = (key: string, value: string) => {
    switch (key) {
    case 'name':
      dispatch({type: "SET_FULL_NAME", fullName: value})
      break;
    case 'password':
      dispatch({type: "SET_PASSWORD", password: value})
      break;
    case 'username':
      dispatch({type: "SET_USERNAME", userName: value})
      break;
    case 'phone':
      dispatch({type: "SET_PHONE", phone: value})
      break;
    default:
      break;
    }
  }

  const handleSignUp = async () => {
    const validation = schemaValidator.safeParse(user);
    if (!validation.success) {
      // Validation failed. try again
      setErrors(validation.error.flatten())

      if (validation.error.flatten().fieldErrors.password?.length) {
        setToolTip(true);
      }

      return;
    }

    const _user: User = {
      email: user.email,
      fullName: user.fullName,
      userName: user.userName,
      password: hashString(user.password),
      phone: user.phone,
      providers: []
    }

    if (user?.providerId) {
      // External provider authentication
      // Save this user detail
      const provider = new UserAuthProvider();
      provider.provider = user.providerId;
      _user.providers?.push(provider);

      console.log({sendToSignUpUser: _user, UserForm: user})
    }

    const {status, message} = await signUpUser(_user);
    if (status === StatusCode.SUCCESS) {
      // Signup success! Go to sign in page
      router.replace("/sign-in")
    } else {
      setSignupError({status, message});
    }
  }

  const passwordTooltip = (
    <div className="grid grid-cols-1 antialiased">
        <span className="text-md font-semibold pb-1">
          Password Rules:
        </span>
        At least 1 uppercase character (A-Z)<br/>
        At least 1 lowercase character (a-z)<br/>
        At least 1 digit (0-9)<br/>
        At least 1 special character:<br/>
        <span className="p-1 pl-2">
          Valid special characters: 
          <span className="text-white text- font-bold space-x-2 pl-2">
            {"@$!%*?&"}
          </span>
        </span>
        At least 10 characters up to 128 characters maximum length<br/>
        No more than 2 identical characters in a row.
    </div>
  );

  return (
    <div
      className=" relative flex-row w-3/4 h-5/6 bottom-0"
    >
      <div
        className="flex-row space-y-4"
      >
        <h1 
          className="flex-row font-semibold text-2xl text-gray-600"
        >
          Create your account
        </h1>
        {signupError && signupError.status !== StatusCode.SUCCESS && (
          signupError?.status === StatusCode.ACCOUNT_EXISTS ? (
            <>
              <span
                className="font-semibold text-red-500"
              >
                {`Account exists for `}
              </span>
              {`${user.email}. `}<br/>
              <Link
                href={"/sign-in"}
                className="text-blue-700"
              > 
                Sign in
              </Link>?
            </>
          ) : (
            <>
              <span
                className="font-semibold text-red-500"
              >
                {signupError.message}
              </span><br/>
              {"Try again, or " }
                <Link
                href={"/sign-up"}
                className="text-blue-700"
              > 
                Sign in 
              </Link>
            </>
          )
        )}
      </div>
      <div
        className="flex-row space-y-4 w-9/12 mt-14"
      >
        <form>
        <div className="space-y-1">
          <label>Full Name</label>
          <Input
            className="border border-gray-300"
            placeholder="Enter your full name"
            onChange={e => {
              onInputChange('name', e.target.value)
            }}
            onKeyDown={()=>clearValidation('fullName')}
          />
          <span className={clsx("text-red-500", {
              "hidden": !errors?.fieldErrors?.fullName
            })}
          >
            {errors?.fieldErrors['fullName']?.at(0)}
          </span>
        </div>
        <div className="space-y-1">
          <label>Phone</label>
          <Input 
            required
            className="border border-gray-300"
            placeholder="909-xxx-xxxx"
            onChange={e => {
              onInputChange('phone', e.target.value)
            }}
            onKeyDown={()=>clearValidation('phone')}
          />
          <span className={clsx("text-red-500", {
              "hidden": !errors?.fieldErrors?.phone
            })}
          >
            {errors?.fieldErrors['phone']?.at(0)}
          </span>
        </div>
        <div className="space-y-1">
          <label>Username</label>
          <Input 
            required
            className="border border-gray-300"
            placeholder="Example, company, department, or your personal name"
            onChange={e => {
              onInputChange('username', e.target.value)
            }}
            onKeyDown={()=>clearValidation('userName')}
          />
          <span className={clsx("text-red-500", {
              "hidden": !errors?.fieldErrors?.userName
            })}
          >
            {errors?.fieldErrors['userName']?.at(0)}
          </span>
        </div>
        <div className="space-y-1">
          <label>Password</label>
          <div className="group relative">
            <Input 
              required
              className="border border-gray-300 data-tooltip-target=${passwordTooltip}"
              type="password"
              formEncType="true"
              placeholder="Enter at least 8 chars. Example: (aBc123@*$&)"
              onChange={e => {
                onInputChange('password', e.target.value)
              }}
              onKeyDown={()=>clearValidation('password')}
            />
            <div className={clsx("", {
                "hidden": !errors?.fieldErrors?.password
              })}
            >
              <div className="text-red-500 relative">
                {errors?.fieldErrors['password']?.at(0)}
              </div>
              {tooltip &&
                <div 
                  className="tooltip absolute inline-block group-hover:opacity-100
                    text-sm text-slate-100 left-0 top-100
                      opacity-0 p-3 bg-gray-500 transition-opacity rounded-md"
                >
                  {passwordTooltip} 
                </div>  
              }
            </div>
          </div>
        </div>
        </form>
      </div>
      <div className="flex-row h-3/5 mb-10">
        <div className="w-full absolute bottom-0">
          <Button
            type="submit"
            className="float-right text-md text-white bg-indigo-600 rounded-md space-x-11"
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

export default SignUpFormUserInfo;