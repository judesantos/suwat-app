import Link from "next/link";
import UserPortlet from "./user-portlet";
import { getCurrentUser } from "@/lib/server/auth";

const UserNavBar = async () => {

  const user = await getCurrentUser();
  console.log({UserNavBar: user})

  return (

    <div className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
      <div className="mr-3 lg:flex nav__item">
        <UserPortlet user={user}/>
      </div>
      {!user &&
        <Link href="/sign-up"
          className="px-6 py-2 text-white bg-indigo-600 rounded-md mr-3 nav__item">
            Get Started
        </Link>
      }
    </div>
  )

}

export default UserNavBar;