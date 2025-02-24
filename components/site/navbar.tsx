import Link from "next/link";
import ThemeChanger from "./dark-switch";
import ToggleMenu from "../ui/toggle-menu";

export default function Navbar() {

  const navigation = ["Product", "Features", "Pricing", "Company", "Blog"];
  
  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        <ToggleMenu menuItems={navigation}/>
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link 
                  href="/"
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline
                    rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-50
                       focus:bg-indigo-100 focus:outline-none"
                >
                  {menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden mr-3 space-x-3 lg:flex nav__item">
          <Link
            href="/sign-up"
            className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5"
          >
            Get Started
          </Link>
          <ThemeChanger />
        </div>
      </nav>
    </div>
  );
}
