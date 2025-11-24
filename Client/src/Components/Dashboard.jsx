import React, { useState } from 'react'
import Navbar from './Navbar'
import SiderBar from './SiderBar'
import { Outlet } from 'react-router-dom'


const Dashboard = () => {
        const [sideclose,setSideClose]=useState(false);
  return (
    <div>
       <div className='flex flex-col'>
         <Navbar sideclose={sideclose} setSideClose={setSideClose}/>
         {/* sliderbar and children layout */}
         <div className='flex flex-row max-h-screen overflow-hidden'>
               <div    className={`  ${sideclose ? 'translate-x-0 w-25' : 'translate-x-0 w-84'}
             overflow-hidden
              p-2 shadow-lg h-[92vh]
            `}
            aria-hidden={sideclose}
          >
                <SiderBar sideclose={sideclose}/>
            </div>
            <main className='flex-1 bg-gray-100  max-h-[92vh] overflow-y-auto p-4'>
                <Outlet/>
            </main>
         </div>
       </div>
    </div>
  )
}

export default Dashboard