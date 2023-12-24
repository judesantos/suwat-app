import { redirect } from "next/navigation";

import { isUserAuthenticated } from "@/lib/firebase/firebase-admin";
import { SignInForm } from "@/components/auth-components";

const SignInPage = async () => {

  if (await !isUserAuthenticated()) {
    redirect("/dashboard");
  }

  return (
    <SignInForm variant="sign-in"/>
  )
}

export default SignInPage;
