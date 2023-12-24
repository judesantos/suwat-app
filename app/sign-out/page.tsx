import { redirect } from "next/navigation";

import { isUserAuthenticated } from "@/lib/firebase/firebase-admin";
import { SignOutForm } from "@/components/auth-components";

const SignOutPage = async () => {

  if (await !isUserAuthenticated()) {
    redirect("/");
  }

  return (
    <SignOutForm/>
  )
}

export default SignOutPage;
