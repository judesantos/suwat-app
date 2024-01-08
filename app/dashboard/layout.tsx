import Header from "@/components/header";
import Container from "@/components/site/container";
import SideBar from "@/components/ui/Sidebar/sidebar";
import Dashboard from "@/components/ui/dashboard";
import { ReactNode, Suspense } from "react";

const Layout = async ({children}: {children: ReactNode}) => {

  return (
    <>
      <Suspense>
        <Header/>
      </Suspense>
      <Container className="flex flex-wrap">
        <Suspense>
          <SideBar/>
        </Suspense>
        <Dashboard>
          {children}
        </Dashboard>
      </Container>
    </>
  );
}

export default Layout;