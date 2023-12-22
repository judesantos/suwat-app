import Image from "next/image";
import Header from '@/components/header';
import Container from '@/components/home/container';
import ThemeProvider from '@/components/theme-provider';
import heroImg from "@/public/img/hero.png";
import SideBar from "@/components/ui/Sidebar/sidebar";
import Dashboard from "@/components/ui/dashboard";
import { Content } from "@radix-ui/react-dropdown-menu";

const UserPage = (props: any) => {
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

export default UserPage;