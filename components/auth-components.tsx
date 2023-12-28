'use client';

import { redirect, useRouter } from "next/navigation";
import { signInWithGithub, signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Button } from "./ui/button";

const buttonStyle = "text-white bg-indigo-600 rounded-md";

const handleSignIn = async (router: AppRouterInstance, provider: string) => {

  let status: boolean = false;

  if ("google" === provider) {

    status = await signInWithGoogle();

  } else if ("github" === provider) {

    status = await signInWithGithub();

  }

  if (status) {
    router.push("/dashboard")
  }

}

const handleSignOut = async (router:AppRouterInstance) => {
  const ok = await signOut();
  if (ok) 
    router.push("/")
}

const SignInDialog = ({
  variant
}: {
  variant: "sign-in" | "dashboard",
}) => {

  const router = useRouter();
  const cancelBtnStyle = buttonStyle + " mt-15";

  if (variant === "sign-in") {
    return (
      <div
      className="flex flex-col w-4/5 space-y-2 absolute top-1/4"
      >
        <Button 
          className={buttonStyle}
          onClick={async () => handleSignIn(router, 'google')}
        >
          Sign in with Google
        </Button>
        <Button 
          className={buttonStyle}
          onClick={async () => handleSignIn(router, 'github')}
        >
          Sign in with Github
        </Button>
        <Button 
          className={buttonStyle}
          onClick={async () => handleSignIn(router, 'facebook')}
        >
          Sign in with Facebook
        </Button>
        <Button 
          className={buttonStyle}
          onClick={async () => handleSignIn(router, 'twitter')}
        >
          Sign in with Twitter
        </Button>
        <Button 
          className={cancelBtnStyle}
          onClick={async () => router.push("/")}
        >
          Cancel
        </Button>
      </div>
    ) 
  } else if (variant === "dashboard") {

    redirect("/dashboard")

  }
  
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

const SignInButton = async ({style}: {style:string}) => {

  const router = useRouter();

  return (
    <Button 
      className={style}
      onClick={async () => handleSignOut(router)}
    >
      Sign In
    </Button>
  )
}

export { SignInDialog, SignOutDialog, SignInButton, SignOutButton };
