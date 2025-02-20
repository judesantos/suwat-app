import { redirect } from "next/navigation";

import SignInDialog from "@/components/auth/sign-in";
import { isSessionAlive } from "@/lib/server/auth";

const SignInPage = async () => {

  const isAuthenticated = await isSessionAlive();
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
