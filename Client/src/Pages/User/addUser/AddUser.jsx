import React, { useEffect, useState } from 'react'
import { userTableDemoDetails } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const AddUser = () => {

    const [adduserData, setAddUserData] = useState({
        firstname: "",
        lastname: "",
        emailid: "",
        role: "",
        password:""
    })
    const navigate = useNavigate()

    useEffect(()=>{
    submithandlerAddUser()
    },[])

    function changeHandler(e) {
        const { name, value, type, checked } = e.target;
        setAddUserData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }

    async function submithandlerAddUser(e) {
        e.preventDefault();
        console.log(adduserData)
        const newUser = {
            id: Date.now(),
            firstName: adduserData.firstname,
            lastName: adduserData.lastname,
            email: adduserData.emailid,
            role: adduserData.role,
            password: adduserData.password,
            action:  <EditIcon/>
        };
        // userTableDemoDetails.push(newUser);
        const response=await axios.post('http://localhost:8080/admin/add',newUser);
        console.log(response)
        setAddUserData({ firstname: "", lastname: "", emailid: "", role: "" ,password:""})
        navigate('/dashboard')
    }
    return (
        <div>
            <div className=' w-full'>
                <form className='p-4 bg-white mx-auto w-[80vw]'>
                    {/* top */}
                    <div className='flex items-center gap-6 pb-6'>
                        <div className=''>
                            <label className='block' htmlFor="firstname">First name</label>
                            <input className='border-gray-400 h-10 border rounded w-100 p-3' value={adduserData.firstname} onChange={(e) => changeHandler(e)} type="text" name="firstname" placeholder='Enter your First Name' />
                        </div>
                        <div className=''>
                            <label className='block' htmlFor="lastname">Last name</label>
                            <input className='border-gray-400 h-10 border rounded w-100 p-3' value={adduserData.lastname} onChange={(e) => changeHandler(e)} type="text" name="lastname" placeholder='Enter your Last Name' />
                        </div>
                    </div>
                    {/* bottom */}
                    <div className='flex items-center gap-6 pb-6'>
                        <div className=''>
                            <label className='block' htmlFor="emailid">Email ID</label>
                            <input className='border-gray-400 h-10 border rounded w-100 p-3 ' value={adduserData.emailid} onChange={(e) => changeHandler(e)} type="text" name="emailid" placeholder='Enter Email ID' />
                        </div>
                        <div className=''>
                            <label className='block' htmlFor="lastname">Password</label>
                            <input className='border-gray-400 h-10 border rounded w-100 p-3' value={adduserData.password} onChange={(e) => changeHandler(e)} type="password" name="password" placeholder='Enter your Last Name' />
                        </div>
                        
                    </div>
                    <div className=''>
                            <label className='block' htmlFor="selectrole">Select Roles</label>
                            <select className='border-gray-600 border w-100 h-10 bg-gray-100 text-gray-600' value={adduserData.role} onChange={(e) => changeHandler(e)} name="role" id="" placeholder='Select Roles'>
                                <option value="" disabled selected>Select Roles</option>
                                <option value="admin">Admin</option>
                                <option value="customer">Customer</option>
                                <option value="readonly">Ready Only</option>
                            </select>
                        </div>
                    <button onClick={(e) => submithandlerAddUser(e)} className='bg-sky-600 text-white text-center px-4 py-2 rounded mt-6 '>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddUser