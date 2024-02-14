import Link from "next/link";
import UserPortlet from "./user-portlet";
import { getCurrentUser } from "@/lib/server/auth";
import DashboardMenu from "./ui/dashboard-menu";
import ThemeChanger from "./site/dark-switch";

export default async function Header() {

  const user = await getCurrentUser();
  const navigation = ["Product", "Features", "Pricing", "Company", "Blog"];

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        <DashboardMenu navigation={navigation} user={user}/>
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
        <div className="hidden mr-3 space-x-3 lg:flex nav__item">
          <UserPortlet user={user}/>
          <ThemeChanger/>
        </div>
      </nav>
    </div>
  )
}
