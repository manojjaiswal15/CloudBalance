import React, { useContext, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../assets/logo/logo.png'
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logout} from '../store/userReducer/userAction'
import { toast } from 'react-toastify';


const Navbar = ({sideclose,setSideClose}) => {
    const navigate=useNavigate()
    const dispatch=useDispatch()

    function LogoutHandle(){
        dispatch(logout())
        navigate('/')
        toast.success("Logout SuccessFully")

    }
   
    return (
        <nav className=' bg-white h-20 p-4 shadow-lg'>
            <div className='mx-auto max-w-[90vw] flex items-center justify-between'>
                {/* left */}
                <div className='flex items-center justify-center gap-6'>
                    <img width={200} className='' src={Logo} alt="" />
                    <MenuIcon onClick={()=>setSideClose(!sideclose)} color='info' className='cursor-pointer' />
                    {/* module change */}
                    <div>
                        <h4 className='font-semibold text-base'>Module</h4>
                        <select className='outline-none text-gray-600 text-md' name="" id="">
                            <option value="">Lens</option>
                            <option value="">Tuner</option>
                            <option value="">Auto</option>
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
                            <h3 className='text-md font-bold text-sky-600'>Manoj</h3>
                        </div>
                        <div>
                            <button onClick={LogoutHandle} className='border-sky-600 border-2 rounded px-3 py-2 text-sky-600 gap-4 flex items-center justify-center cursor-pointer'>
                                <LogoutIcon/>
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