'use client';

import { passwordResetRequest } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";

const ForgotPassword = () => {

  const [state, dispatch] = useFormState(passwordResetRequest, {errors: {}})

  return (
    <>
      <div 
        className="flex-row w-full space-y-3 text-center"
      >
        <div
          className="flex-row font-semibold text-4xl text-gray-600"
        >
          Forgot your password?
        </div>
        <div
          className="w-full text-center"
        >
          We&#39;ll email details on how to recover your account
        </div>
      </div>
      <form action={dispatch}>
        <div
          className="grid grid-cols space-y-2 w-full mt-14"
        >
          <Input
            id="email"
            name="email"
            required
            className="border border-gray-300"
            placeholder="email@company.com"
          />
          <p className="text-red-500 text-center">
            {state?.errors?.email}
          </p>
          <Button
            type="submit"
            className="text-white bg-indigo-600 rounded-md h-10 p-2 align-middle text-center"
          >
            Submit 
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </form>
    </>
  )
}

export default ForgotPassword;