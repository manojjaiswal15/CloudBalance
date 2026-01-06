import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { user_base_url } from '../../../Service/authService';
import { toast } from 'react-toastify';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const EditUser = () => {
    const [edituserData, seteditUserData] = useState({
        firstname: "",
        lastname: "",
        emailid: "",
        role: "",
        password: ""
    })
    const [selectedOnboardingAccount, setSelectedOnboardingAccount] = useState([]);
    const [allOnboardingAcount, setAllOnboardingAccount] = useState([])
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

                const getAllAccountAssign = await axios.get(
                    `http://localhost:8080/onboarding/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
                )
                const allAccount = await axios.get(`http://localhost:8080/onboarding/allaccounts`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                })
                setAllOnboardingAccount(allAccount?.data)
                setSelectedOnboardingAccount(getAllAccountAssign.data.account)
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

    // changehandler
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
            password: edituserData.password,
            accountId: selectedOnboardingAccount
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
            seteditUserData({ firstname: "", lastname: "", emailid: "", role: "", password: "" })
            toast.success("Update Successfully")
            navigate("/dashboard/users");
        } catch (error) {
            toast.error("Update failed", error);
        }

    }

    // mapping left checkbox to send right box 
    const handleAccountToggle = (accountId) => {
        setSelectedOnboardingAccount(prev =>
            prev.includes(accountId)
                ? prev.filter(id => id !== accountId)
                : [...prev, accountId]
        );
    };


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

                    {/* this is for customer */}
                    <div className='mt-5'>
                        {
                            edituserData.role === "customer" ?
                                <div className='flex items-center justify-between gap-10 w-[1000px] px-4 py-2'>
                                    {/* left side */}
                                    <div className="shadow-2xl rounded-2xl border border-gray-100 w-1/2">
                                        <div className='bg-sky-300 w-full px-2 py-3 text-center rounded-t-2xl'>
                                            <h3 className="font-semibold mb-2">Onboarding Accounts</h3>
                                        </div>

                                        <div className="h-64 overflow-y-auto">
                                            {
                                                allOnboardingAcount.map((item, index) => (
                                                    <label key={item.id} className={`${index % 2 == 0 ? 'bg-gray-300' : 'bg-white'} flex items-center gap-2 mb-2 pl-4 cursor-pointer w-full h-10`} >
                                                        <input className='w-5 h-4' type="checkbox" checked={selectedOnboardingAccount.includes(item.id)} onChange={() => handleAccountToggle(item.id)} />
                                                        <span className='text-lg'>{item.accountName}</span>
                                                    </label>
                                                ))}
                                        </div>
                                    </div>

                                    {/* right side */}
                                    <div className="shadow-2xl rounded-2xl border border-gray-100 w-1/2">
                                        <div className='bg-sky-300 w-full px-2 py-3  text-center rounded-t-2xl'>
                                            <h3 className="font-semibold mb-2">Selected Accounts</h3>
                                        </div>

                                        <div className="h-64 overflow-y-auto">
                                            {
                                                selectedOnboardingAccount.length > 0 ? (allOnboardingAcount.filter(acc => selectedOnboardingAccount.includes(acc.id)).map((item, index) => (
                                                    <div key={item.id} className={`${index % 2 === 0 ? 'bg-gray-300' : 'bg-white'} flex items-center gap-2 mb-2 pl-4 w-full h-10`}>
                                                        {item.accountName}
                                                    </div>
                                                ))
                                                )
                                                    :
                                                    (
                                                        <div className='flex flex-col py-4 justify-center items-center gap-6'>
                                                            <div className='flex flex-col items-center justify-center'>
                                                                <FolderOpenIcon style={{ fontSize: "100px", fontWeight: "200" }} />
                                                                <h3 className='text-2xl font-medium'>No Account ID's Added</h3>
                                                            </div>
                                                            <p className='text-base text-gray-600 '>Selected Account IDs will be shown here</p>

                                                        </div>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </div>
                                : null
                        }
                    </div>

                    <button type='submit' className='bg-sky-600 text-white text-center px-4 py-2 rounded mt-6 '>Edit</button>
                </form>
            </div>
        </div>
    )
}

export default EditUser