
import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { UserRecord } from "firebase-admin/auth";
import Link from "next/link"

const DashboardButton = async () => {

  let href = "/dashboard";

  const user: UserRecord | false = await getCurrentUser();
  if (!user) {
    href = "/sign-in";
  }

  return (

    <div className="hidden mr-3 space-x-3 lg:flex nav__item">
      <Link
        href={href}
        className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5"
      >
        {!user ? <span>Sign In</span> : <span>Dashboard</span>} 
      </Link>
    </div>
  )
}

export default DashboardButton;