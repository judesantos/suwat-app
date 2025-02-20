'use client';

import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import ThemeChanger from "../site/dark-switch";
import UserPortlet from "../user-portlet";

const DashboardMenu = (props:any) => {
  return (
    <Disclosure>
      {/* Logo  */}
      {({ open }) => (
        <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
          <Disclosure.Button
            aria-label="Toggle Menu"
            className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700">
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              {open && (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              )}
              {!open && (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </Disclosure.Button>
          <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
            <ThemeChanger/>
            {props?.navigation.map((item:any, index:number) => (
              <Link 
                key={index}
                href="/"
                className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700"
              >
                {item}
              </Link>
            ))}
            <UserPortlet user={props?.user}/>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}

export default DashboardMenu;