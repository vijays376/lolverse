// import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/common/Sidebar"

function Dashboard() {
  //   const { loading: profileLoading } = useSelector((state) => state.profile)
  //   const { loading: authLoading } = useSelector((state) => state.auth)

  //   if (profileLoading || authLoading) {
  //     return (
  //       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
  //         <div className="spinner"></div>
  //       </div>
  //     )
  //   }

  return (
    <div className="flex flex-row">
      <Sidebar className="relative"/>
      <div className="">
        <div className="mt-20 absolute">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard