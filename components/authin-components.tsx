import { ComponentPropsWithRef } from 'react';
import { SignIn, SignOut } from "@/lib/actions"
import { Button } from "./ui/button"

export const SignInForm = ({
  provider,
  ...props
}: { provider?: string } & ComponentPropsWithRef<typeof Button>) => {
  const onSignIn = SignIn.bind(null, provider || '');
  return (
    <form action={onSignIn}>
      <Button {...props}>Sign In</Button>
    </form>
  )
}

export const SignOutForm = (props: ComponentPropsWithRef<typeof Button>) => {
  const onSignOut = SignOut.bind(null);
  return (
    <form 
      action={onSignOut}
      className="w-full"
    >
      <Button
        {...props}
        className="w-full p-0"
      >
        Sign Out
      </Button>
    </form>
  )
}
