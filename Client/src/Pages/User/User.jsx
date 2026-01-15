import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import UserTable from '../../Components/UserTable'
import { useSelector } from 'react-redux'

const User = () => {
    const navigate=useNavigate()
    const {user}=useSelector(store=>store.auth)
  return (
    <div>
        {
          user.role=="admin"? <div className='pb-3 border-b border-b-gray-400'><h4 className='text-2xl font-semibold'>Add New User</h4>
         <button  onClick={()=>navigate('/dashboard/users/create')} className='border-sky-600 border-2 rounded px-3 py-2 bg-sky-600 cursor-pointer text-white mt-3'>Add User</button>
        </div> : ''
        }
        <div className=' py-3'>
            <h2 className='font-medium text-xl text-gray-700'>All User details</h2>
              <div className='mt-3'>
                <UserTable/>
              </div>
        </div>
    </div>
  )
}

export default User