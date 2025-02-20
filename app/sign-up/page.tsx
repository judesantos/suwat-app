import SignUpMain from "@/components/sign-up/signup-main";
import { isSessionAlive } from "@/lib/server/auth";
import { redirect } from "next/navigation";

const SignUpPage = async () => {

  const isAuthenticated = await isSessionAlive();
  if (isAuthenticated) {
    redirect("/dashboard");
  }
  console.log("Sign-up!")

  return (
    <SignUpMain/>
  )
}

export default SignUpPage;
