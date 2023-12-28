import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import ThemeChanger from "./site/dark-switch";

import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { UserRecord } from "firebase-admin/auth";

export default async function Header() {

  const user: UserRecord | false = await getCurrentUser();
  const navigation = ["Product", "Features", "Pricing", "Company", "Blog"];

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link 
                  href="/"
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none">
                    {menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
          <div className="hidden mr-3 space-x-3 lg:flex nav__item">
            {user &&
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative w-8 h-8 rounded-full">
                      <Avatar className="w-8 h-8">
                        {user?.photoURL && (
                          <AvatarImage
                            src={user.photoURL}
                            alt={user.displayName ?? ""}
                          />
                        )}
                        <AvatarFallback>{user?.email}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.displayName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
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
                        href="/sign-out"
                        className="items-center inline-block px-4 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none"
                      >
                        Sign Out
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            }
          </div>
          <ThemeChanger/>
        </div>
      </nav>
    </div>
  )
}
