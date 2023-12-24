import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

import { SignInForm, SignOutForm } from "./auth"
import { getCurrentUser } from "@/lib/firebase/firebase-admin"

export default async function UserButton() {
  const user = await getCurrentUser();
  if (!user) return <SignInForm/>
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full">
          <Avatar className="w-8 h-8">
            {user.photoURL && (
              <AvatarImage
                src={user.photoURL}
                alt={user.displayName ?? ""}
              />
            )}
            <AvatarFallback>{user.email}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.displayName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <SignOutForm />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
