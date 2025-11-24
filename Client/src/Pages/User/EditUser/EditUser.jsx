import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const EditUser = () => {
     const [edituserData, seteditUserData] = useState({
        firstname: "",
        lastname: "",
        emailid: "",
        role: ""
    })
    const navigate = useNavigate()

    function changeHandler(e) {
        const { name, value, type, checked } = e.target;
        seteditUserData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }

    function submithandlerEditUser(e) {
        e.preventDefault();
        console.log(edituserData)
        const newUser = {
            id: Date.now(),
            firstName: edituserData.firstname,
            lastName: edituserData.lastname,
            email: edituserData.emailid,
            role: edituserData.role,
            action: "Edit"
        };
        
        seteditUserData({ firstname: "", lastname: "", emailid: "", role: "" })
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
                            <input className='border-gray-400 h-10 border rounded w-100 p-3' value={edituserData.firstname} onChange={(e) => changeHandler(e)} type="text" name="firstname" placeholder='Enter your First Name' />
                        </div>
                        <div className=''>
                            <label className='block' htmlFor="lastname">Last name</label>
                            <input className='border-gray-400 h-10 border rounded w-100 p-3' value={edituserData.lastname} onChange={(e) => changeHandler(e)} type="text" name="lastname" placeholder='Enter your Last Name' />
                        </div>
                    </div>
                    {/* bottom */}
                    <div className='flex items-center gap-6'>
                        <div className=''>
                            <label className='block' htmlFor="emailid">Email ID</label>
                            <input className='border-gray-400 h-10 border rounded w-100 p-3 ' value={edituserData.emailid} onChange={(e) => changeHandler(e)} type="text" name="emailid" placeholder='Enter Email ID' />
                        </div>
                        <div className=''>
                            <label className='block' htmlFor="selectrole">Select Roles</label>
                            <select className='border-gray-600 border w-100 h-10 bg-gray-100 text-gray-600' value={edituserData.role} onChange={(e) => changeHandler(e)} name="role" id="" placeholder='Select Roles'>
                                <option value="" disabled selected>Select Roles</option>
                                <option value="admin">Admin</option>
                                <option value="customer">Customer</option>
                                <option value="readonly">Ready Only</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={(e) => submithandlerEditUser(e)} className='bg-sky-600 text-white text-center px-4 py-2 rounded mt-6 '>Edit</button>
                </form>
            </div>
        </div>
  )
}

export default EditUser