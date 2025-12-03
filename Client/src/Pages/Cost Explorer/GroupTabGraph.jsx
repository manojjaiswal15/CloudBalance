import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import TuneIcon from '@mui/icons-material/Tune';

const GroupTabGraph = () => {
  return (
    <div>
      <div className='bg-transparent shadow-2xl mt-10 p-6'>
        {/* tabbing for */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <h3 className='text-sm font-semibold'>Group By :</h3>
            <div className='flex items-center justify- gap-3'>
              <NavLink to="/service1" className={(({ isActive }) => `${isActive ? 'bg-blue-700 text-white' : 'bg-white text-blue-600'} px-4 py-2 rounded`)}>Service</NavLink>
              <NavLink to="/service1" className={(({ isActive }) => `${isActive ? 'bg-blue-700 text-white' : 'bg-white text-blue-600'} px-4 py-2 rounded`)}>Service</NavLink>
              <NavLink to="/service1" className={(({ isActive }) => `${isActive ? 'bg-blue-700 text-white' : 'bg-white text-blue-600'} px-4 py-2 rounded `)}>Service</NavLink>
              <NavLink to="/service1" className={(({ isActive }) => `${isActive ? 'bg-blue-700 text-white' : 'bg-white text-blue-600'} px-4 py-2 rounded`)}>Service</NavLink>
            </div>
          </div>
          {/* icons */}
          <div className='p-1 border border-blue-700'>
            <TuneIcon className='text-blue-700' />
          </div>
        </div>
      </div>
      <Outlet/>
    </div>
  )
}

export default GroupTabGraph