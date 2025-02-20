import FileManager from "@/components/file-manager";
import { getCurrentUser } from "@/lib/server/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const DashboardPage = async () => {

  const currUser = await getCurrentUser();
  if (!currUser) redirect("/sign-in");

  return (
    <Suspense>
      <FileManager/>
    </Suspense>
  );
}

export default DashboardPage;