import Header from "@/components/header";
import SideBar from "@/components/ui/Sidebar/sidebar";
import ThemeProvider from "@/components/theme-provider";
import { ReactNode } from "react";
import Container from "@/components/site/container";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";

const Layout = async ({children}: {children: ReactNode}) => {

  const currUser = await getCurrentUser();
  console.log({dashboard: currUser})

  if (!currUser) redirect("/sign-in");

  console.log('redirect to dashboard')

  return (
    <ThemeProvider attribute="class">
      <Header/>
      <Container className="flex flex-wrap">
        <SideBar/>
        {children}
      </Container>
    </ThemeProvider>
  );
}

export default Layout;