import { redirect } from "next/navigation";

import SignOutDialog from "@/components/auth/sign-out";
import { isSessionAlive } from "@/lib/server/auth";

const SignOutPage = async () => {

  if (await !isSessionAlive()) {
    redirect("/");
  }

  return (
    <div
      className="absolute top-1/4 left-1/3 w-1/3 h-3/5 border-2 border-gray-300 p-10"
    >
      <SignOutDialog/>
    </div>
  )
}

export default SignOutPage;
