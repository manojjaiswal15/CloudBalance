import React from 'react'
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const UserOnboarding = () => {
  return (
    <div className=''>
      <div className='w-[96%] mx-auto'>
         <h2>Accounts</h2>
         <div className='bg-white mt-6 flex flex-col items-center justify-center h-[80vh] gap-4 p-10 '>
               <FolderOpenIcon style={{fontSize:"300px"}}/>
               <h3 className='text-lg font-semibold'>You have no Accounts Linked..</h3>
               <p className='text-gray-600 text-base'>Click below to start linking yours Accounts</p>
               <button className='px-4  py-2 rounded text-center bg-sky-500 text-white cursor-pointer'>Link Account</button>
         </div>
      </div>
    </div>
  )
}

export default UserOnboarding