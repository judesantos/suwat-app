import { ReactNode, Suspense } from "react";
import Header from "../header";


const Dashboard = ({children}:{children: ReactNode}) => {
  return (

    <div className="lg:w-3/4 pl-8">
      <Suspense>
        <Header/>
      </Suspense>
      {children}
    </div>
  )
}

export default Dashboard;