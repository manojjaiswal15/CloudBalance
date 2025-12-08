import React, { useState } from 'react'
import Navbar from './Navbar'
import SiderBar from './SiderBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'


const Dashboard = () => {
  const [sideclose, setSideClose] = useState(false);
  return (
    <div>
      <div className='flex flex-col '>
        <Navbar sideclose={sideclose} setSideClose={setSideClose} />
        {/* sliderbar and children layout */}
        <div className='flex flex-row max-h-[calc(100vh-110px)] overflow-hidden'>
          <div className={`  ${sideclose ? 'translate-x-0 w-25 transition-transform duration-300 ease-in-out' : 'translate-x-0 w-84'}
             overflow-hidden
              p-2 shadow-lg  max-h-[calc(100vh-80px)]
            `}
            aria-hidden={sideclose}
          >
            <SiderBar sideclose={sideclose} />
          </div>
          <main className='flex-1 bg-gray-100  min-h-[92vh]  overflow-y-auto p-4'>
            <Outlet />
          </main>
          
        </div>
            <Footer/>
      </div>
    </div>
  )
}

export default Dashboard