import Image from "next/image";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";

import Header from '@/components/header';
import Container from '@/components/site/container';
import ThemeProvider from '@/components/theme-provider';
import SideBar from "@/components/ui/Sidebar/sidebar";
import Dashboard from "@/components/ui/dashboard";

const DashboardPage = async () => {

  const currUser = await getCurrentUser();
  if (!currUser) redirect("/sign-in");

  return (
    <ThemeProvider attribute="class">
      <Header/>
        <Container className="flex flex-wrap">
          <SideBar/>
          <Dashboard/>
        </Container>
    </ThemeProvider>
  );
}

export default DashboardPage;