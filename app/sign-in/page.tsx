import { redirect } from "next/navigation";

import { isUserAuthenticated } from "@/lib/firebase/firebase-admin";
import { SignInDialog } from "@/components/auth-components";

const SignInPage = async () => {

  if (await isUserAuthenticated()) {
    redirect("/dashboard/files");
  }

  return (
    <div
      className="absolute top-1/4 left-1/3 w-1/3 h-3/5 border-2 border-gray-300 p-10"
    >
      <SignInDialog variant="sign-in"/>
    </div>
  )
}

export default SignInPage;
