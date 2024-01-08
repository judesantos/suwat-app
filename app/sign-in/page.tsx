import { redirect } from "next/navigation";

import { isUserAuthenticated } from "@/lib/firebase/firebase-admin";
import SignInDialog from "@/components/auth/sign-in";

const SignInPage = async () => {

  const isAuthenticated = await isUserAuthenticated();
  
  console.log({isAuthenticated})
  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <div
        className="md:overflow-y-auto"
    >
        <div
          className="w-full h-screen flex justify-center items-center"
        >
          <SignInDialog variant="sign-in"/>
        </div>
    </div>
  )
}

export default SignInPage;
