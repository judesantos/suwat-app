import { ReactNode } from "react";


const Dashboard = ({children}:{children: ReactNode}) => {
  return (

    <div className="lg:w-3/4 pl-8">
      {children}
    </div>
  )
}

export default Dashboard;