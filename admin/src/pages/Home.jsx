// import React from "react";
// import NavBar from "../components/Nav.jsx"
// import Sidebar from "../components/Sidebar.jsx"

// export default function Home(){
//      return(
//           <>
//         <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative'>
//           <NavBar></NavBar>
//           < Sidebar/>
//          </div>
//           </>
//      )
// }




import React from "react";

import NavBar from "../components/Nav.jsx";
import Sidebar from "../components/Sidebar.jsx";

import AdminDashboard from "../components/AdminDashboard.jsx";


export default function Home() {

  return (

    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white overflow-x-hidden">

      <NavBar />

      <div className="flex pt-[70px]"> 

        {/* SIDEBAR */}

        <Sidebar />

        {/* DASHBOARD */}

 
        <div className="flex-1 ml-[250px] p-[20px]">

          <AdminDashboard />

        </div>

       </div>

    </div>
  );
}