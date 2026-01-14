import React, { useEffect, useState } from 'react'
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { account_base_url } from '../../Service/service';
import { onboardingAccountTableHeading } from './config';
import { useSelector } from 'react-redux';

const UserOnboarding = () => {
  const [onboardingList, setOnboardingList] = useState([])
  const { user } = useSelector(state => state.auth)
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
      {/* <h2>Account Onboarding</h2> */}
      <div className='bg-white p-3 rounded-md'>
        <div className=' pb-3 flex items-center justify-between '>
          <h2 className='text-xl font-bold text-gray-700'>Onboarding Account List</h2>
          <div className=''>
            {
              user.role === "admin" ? <button onClick={handleNavigate} className='bg-sky-700 text-white px-3 py-2 rounded text-center gap-2 cursor-pointer flex items-center'>Link Account<FolderOpenIcon /></button> : null
            }
          </div>
        </div>

        {/* content showing */}
        <div className="bg-white overflow-y-auto border border-gray-300" style={{ maxHeight: "60vh" }}>
          <table className="w-full">
            <thead className="bg-sky-200">
              <tr className="border-e">
                {
                  onboardingAccountTableHeading.map(item => {
                    return (
                      <th className="border-e border-gray-200 p-2">{item}</th>
                    )
                  })
                }
              </tr>
            </thead>

            <tbody>
              {onboardingList.map((item, index) => (
                <tr key={item.id} className={`border-e text-center ${index % 2 === 0 ? "bg-gray-100" : ""}`}  >
                  <td className="border-e border-gray-200 p-2">{item.id}</td>
                  <td className="border-e border-gray-200 p-2">{item.arn}</td>
                  <td className="border-e border-gray-200 p-2"> {item.accountId}</td>
                  <td className="border-e border-gray-200 p-2">{item.accountName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserOnboarding