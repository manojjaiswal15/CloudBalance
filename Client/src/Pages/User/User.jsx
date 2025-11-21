import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import EnhancedTable from '../../Components/Table'

const User = () => {
    const navigate=useNavigate()
  return (
    <div>
         <h4 className='text-2xl font-semibold'>Add New User</h4>
         <button  onClick={()=>navigate('/dashboard/users/create')} className='border-sky-600 border-2 rounded px-3 py-2 bg-sky-600 cursor-pointer text-white mt-3'>Add User</button>
        <br className='text-black'/>
        <Outlet/>
        {/* all user details */}
        <div>
            <h2>All User details</h2>
              <div>
                <EnhancedTable/>
              </div>
        </div>
    </div>
  )
}

export default User