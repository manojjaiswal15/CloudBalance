import React, { useEffect, useState } from 'react'
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { account_base_url } from '../../Service/authService';
import { onboardingAccountTableHeading } from './config';
import { useSelector } from 'react-redux';

const UserOnboarding = () => {
  const [onboardingList,setOnboardingList]=useState([])
  const {user}=useSelector(state=>state.auth)
  const navigate = useNavigate()
  const userToken = localStorage.getItem("token")

  // navigation
  const handleNavigate = () => {
    navigate('/dashboard/onboarding/add')
  }

  //all account fetch 
useEffect(() => {
  async function handleFetchAccountOnboarding() {
    try {
      const response = await axios.get(
        `${account_base_url}/allaccounts`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      setOnboardingList(response.data); 
    } catch (error) {
      console.error("Error fetching onboarding accounts:", error);
    }
  }

  handleFetchAccountOnboarding();
}, []);


  return (
    <div className=''>
      <h2>Account Onboarding</h2>
      <div className='bg-white p-3 rounded shadow-2xl'>
        {/* <div className='border p-2 flex items-center justify-between bg-white rounded'> */}
        <div className='border-b pb-3 flex items-center justify-between rounded'>
          <h2 className='text-lg font-semibold text-gray-700'>Onboarding Account List</h2>
          <div className=''>
            {
              user.role==="admin" ?   <button onClick={handleNavigate} className='bg-sky-700 text-white px-3 py-2 rounded text-center gap-2 cursor-pointer'>Link Account<FolderOpenIcon/></button> : null
            }
          </div>
        </div>
        {/* content showing */}
        <div className='border-gray-500 border' >
          {/* table heading */}
          <div className='flex items-center justify-between bg-sky-600 text-white p-3'>
            {
              onboardingAccountTableHeading.map((items)=>{
                return(
                 <li className='list-none font-semibold text-base'>{items}</li>
                )
              })
            }
          </div>
       {/* map data */}
          <div className='px-3 py-2'>
            {
              onboardingList.map((item)=>{
                return(
                 <ul className='flex  items-center list-none justify-between'>
                   <li>{item.id}</li>
                   <li>{item.arn}</li>
                   <li>{item.accountId}</li>
                   <li>{item.accountName}</li>
                 </ul>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserOnboarding