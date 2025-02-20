'use client';

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { handleSignOut } from "@/lib/client/auth";

const buttonStyle = "text-white bg-indigo-600 rounded-md";

const SignOutButton = async ({style}: {style:string}) => {

  const router = useRouter();

  return (
    <Button 
      className={style}
      onClick={async () => handleSignOut(router)}
    >
      Sign Out
    </Button>
  )
}

const SignOutDialog = () => {

  const router = useRouter();
  
  return (
    <div
      className="grid grid-cols-1 w-4/5 space-y-2 absolute top-1/3"
    >
        <Button 
          className={buttonStyle}
          onClick={async () => handleSignOut(router)}
        >
          Confirm sign out
        </Button>
        <Button 
          className={buttonStyle}
          onClick={async () => router.push("/dashboard")}
        >
          Cancel
        </Button>
    </div>
  ) 
}

export default SignOutDialog;
export {
  SignOutButton
}