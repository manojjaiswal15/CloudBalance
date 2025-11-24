import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { AWSTabData } from './config/config'

const AwsExplorer = () => {
  return (
    <div>
      {/* navlink for switching tab */}
      <div className='grid grid-cols-3 text-center w-[20vw] bg-white border-gray-300 mb-6'>
        {
          AWSTabData.map((items) => {
            return (
              <NavLink key={items.id} to={items.path} className={({ isActive }) => `${isActive ? "bg-sky-200 rounded" : ""}`}>
                <div className=" border border-sky-100 rounded px-3 py-2 ">{items.label}</div>
              </NavLink>
            )
          })
        }
      </div>
      <Outlet />
    </div>
  )
}

export default AwsExplorer