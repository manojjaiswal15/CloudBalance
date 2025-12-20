import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { user_base_url } from '../../../Service/authService';
import { toast } from 'react-toastify';

const EditUser = () => {
    const [edituserData, seteditUserData] = useState({
        firstname: "",
        lastname: "",
        emailid: "",
        role: "",
        password: ""
    })
    const navigate = useNavigate()
    const { id } = useParams()
    const userToken = localStorage.getItem("token")


    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get(
                    `http://localhost:8080/admin/user/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    }
                );

                seteditUserData({
                    firstname: response.data.firstName,
                    lastname: response.data.lastName,
                    emailid: response.data.email,
                    role: response.data.role,
                    password: response.data.password
                });
            } catch (error) {
                console.error("Failed to fetch user", error);
            }
        }

        fetchUser();
    }, [id]);
    function changeHandler(e) {
        const { name, value, type, checked } = e.target;
        seteditUserData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }

    // edit
    async function submithandlerEditUser(e) {
        e.preventDefault();
        const updatedUser = {
            firstName: edituserData.firstname,
            lastName: edituserData.lastname,
            email: edituserData.emailid,
            role: edituserData.role,
            password: edituserData.password
        };
        try {
            await axios.put(
                `${user_base_url}/edit/${id}`, 
                updatedUser,
                {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            },
            );
            seteditUserData({ firstname: "", lastname: "", emailid: "", role: "" ,password:""})
            toast.success("Update Successfully")
            navigate("/dashboard/users");
        } catch (error) {
            toast.error("Update failed", error);
        }

    }
    return (
        <div>
            <div className=' w-full'>
                <form onSubmit={submithandlerEditUser} className='p-4 bg-white mx-auto w-[80vw]'>
                    {/* top */}
                    <div className='flex items-center gap-6 pb-6'>
                        <div className=''>
                            <label className='block' htmlFor="firstname">First name</label>
                            <input className='border-gray-400 h-10 border rounded w-100 p-3' required value={edituserData.firstname} onChange={(e) => changeHandler(e)} type="text" name="firstname" placeholder='Enter your First Name' />
                        </div>
                        <div className=''>
                            <label className='block' htmlFor="lastname">Last name</label>
                            <input className='border-gray-400 h-10 border rounded w-100 p-3' required value={edituserData.lastname} onChange={(e) => changeHandler(e)} type="text" name="lastname" placeholder='Enter your Last Name' />
                        </div>
                    </div>
                    {/* bottom */}
                    <div className='flex items-center gap-6 pb-6'>
                        <div className=''>
                            <label className='block' htmlFor="emailid">Email ID</label>
                            <input className='border-gray-400 h-10 border rounded w-100 p-3 ' required value={edituserData.emailid} onChange={(e) => changeHandler(e)} type="text" name="emailid" placeholder='Enter Email ID' />
                        </div>
                        <div className=''>
                            <label className='block' htmlFor="lastname">Password</label>
                            <input className='border-gray-400 h-10 border rounded w-100 p-3' required value={edituserData.password} onChange={(e) => changeHandler(e)} type="password" name="password" placeholder='Enter your Last Name' />
                        </div>

                    </div>
                    <div className=''>
                        <label className='block' htmlFor="selectrole">Select Roles</label>
                        <select className='border-gray-600 border w-100 h-10 bg-gray-100 text-gray-600' required value={edituserData.role} onChange={(e) => changeHandler(e)} name="role" id="" placeholder='Select Roles'>
                            <option value="" disabled selected>Select Roles</option>
                            <option value="admin">Admin</option>
                            <option value="customer">Customer</option>
                            <option value="readonly">Ready Only</option>
                        </select>
                    </div>
                    <button type='submit' className='bg-sky-600 text-white text-center px-4 py-2 rounded mt-6 '>Edit</button>
                </form>
            </div>
        </div>
    )
}

export default EditUser