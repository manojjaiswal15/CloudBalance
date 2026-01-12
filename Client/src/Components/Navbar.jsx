import React, { useContext, useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../assets/logo/logo.png'
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userReducer/userAction'
import { toast } from 'react-toastify';
import { UserFetchAssignAccountContext } from '../Context/UserFetchAssignAccountContext';
import axios from 'axios';
import { cost_base_url } from '../Service/service';
import {accountId} from '../store/accountIdReducer/accountAction'


const Navbar = ({ sideclose, setSideClose }) => {

    // const AssignAccount = useContext(UserFetchAssignAccountContext)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {accountdata}=useSelector(state=>state.account)
    const user = JSON.parse(localStorage.getItem("user"))
    const token=localStorage.getItem("token")

    function LogoutHandle() {
        dispatch(logout())
       
        navigate('/')
        toast.success("Logout SuccessFully")

    }

   useEffect(() => {
    async function getAllAccountIdFromSnowflake() {
        const res = await axios.get(`${cost_base_url}/allaccounts`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch(accountId(res.data.accountid));
    }

    getAllAccountIdFromSnowflake();
}, [dispatch]);  


    // console.log("msfmsmf", AssignAccount)
    console.log(accountdata)

    return (
        <nav className=' bg-white h-20 p-4 shadow-lg'>
            <div className='mx-auto max-w-[90vw] flex items-center justify-between'>
                {/* left */}
                <div className='flex items-center justify-center gap-6'>
                    <img width={200} className='' src={Logo} alt="" />
                    <MenuIcon onClick={() => setSideClose(!sideclose)} color='info' className='cursor-pointer' />
                    {/* module change */}
                    
                         <div>
                            <h4 className='font-semibold text-base'>Module</h4>
                            <select className='outline-none text-gray-600 text-md' name="" id="">
                                {
                                    accountdata.map(item => <option key={item} value={item}>{item}</option>)
                                }
                            </select>
  
                        </div>
                </div>

                {/* right */}
                <div>
                    {/* profile logo */}
                    <div className='flex items-center justify-between gap-4 border-r-gray-600'>
                        <div className='rounded-full p-2 border-sky-600 border text-sky-600 shadow-lg'>
                            <GroupIcon />
                        </div>
                        <div className='flex flex-col items-start border-r-gray-600 border-r pr-3'>
                            <p className='text-sm text-gray-600 font-normal'>Welcome</p>
                            <h3 className='text-md font-bold text-sky-600'>{user.firstName}</h3>
                        </div>
                        <div>
                            <button onClick={LogoutHandle} className='border-sky-600 border-2 rounded px-3 py-2 text-sky-600 gap-4 flex items-center justify-center cursor-pointer'>
                                <LogoutIcon />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar