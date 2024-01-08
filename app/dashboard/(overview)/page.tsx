import FileManager from "@/components/file-manager";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const DashboardPage = async () => {

  const currUser = await getCurrentUser();
  console.log({layout_dashboard: currUser})

  if (!currUser) redirect("/sign-in");

  console.log('redirect to dashboard')

  return (
    <Suspense>
      <FileManager/>
    </Suspense>
  );
}

export default DashboardPage;