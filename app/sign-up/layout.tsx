import { ReactNode } from "react";

const Layout = async ({children}: {children: ReactNode}) => {

  return (
    <main
      className="flex h-screen flex-col md:flex-row md:overflow-hidden"
    >
      <div
          className="md:w-3/5 md:overflow-y-auto"
      >
        <div className="w-full h-screen">
          {children}
        </div>
      </div>
      <div
        className="w-2/5 bg-purple-800 bg-opacity-80 flex-none"
      >
      </div>
    </main>
  )
}

export default Layout;