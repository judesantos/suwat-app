import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserRecord } from "firebase-admin/auth";
import { Button } from "./ui/button";
import ThemeChanger from "./site/dark-switch";
import Link from 'next/link';

const UserPortlet = async (props:{user:UserRecord|any}) => {

  return (
    <>
      {props?.user ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative w-8 h-8 rounded-full">
                <Avatar className="w-8 h-8">
                  {props?.user?.photoURL && (
                    <AvatarImage
                      src={props?.user?.photoURL}
                      alt={props?.user?.displayName ?? ""}
                    />
                  )}
                  <AvatarFallback>{props.user?.email}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {props.user?.displayName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {props.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <span
                  className="inline-block px-4 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none">
                  <ThemeChanger/> 
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/api/auth/sign-out"
                  className="items-center inline-block px-4 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none"
                >
                  Sign Out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <Link
          href="/sign-in"
          className="px-6 py-2 dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none"
        >
          <span>Sign In</span> 
        </Link>
      )
      }
    </>
  )
}

export default UserPortlet;