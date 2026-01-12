import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { account_base_url } from '../../../Service/service';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AddUser = () => {

    const [adduserData, setAddUserData] = useState({
        firstname: "",
        lastname: "",
        emailid: "",
        role: "",
        password: ""
    })

    const [onboardingAccoutList, setOnbardingAccountList] = useState([])
    const [selectedAccounts, setSelectedAccounts] = useState([]);

    const navigate = useNavigate()

    const userToken = localStorage.getItem("token")


    useEffect(() => {
        submithandlerAddUser()
    }, [])

    function changeHandler(e) {
        const { name, value, type, checked } = e.target;
        setAddUserData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }

   async function submithandlerAddUser(e) {
    e.preventDefault();

    const payload = {
        firstName: adduserData.firstname,
        lastName: adduserData.lastname,
        email: adduserData.emailid,
        role: adduserData.role,
        password: adduserData.password,
        accountId: selectedAccounts.map(acc => acc.id)
    };

    try {
        const response = await axios.post(
            "http://localhost:8080/admin/add",
            payload,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }
        );

        console.log("User created:", response.data);

        setAddUserData({
            firstname: "",
            lastname: "",
            emailid: "",
            role: "",
            password: ""
        });
        setSelectedAccounts([]);

        navigate('/dashboard');
    } catch (error) {
        console.error("User creation failed:", error);
    }
}


    useEffect(() => {
        const fetchAllAccountDetailsOnboarding = async () => {
            const response = await axios.get(`${account_base_url}/allaccounts`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            setOnbardingAccountList(response?.data)
        }

        fetchAllAccountDetailsOnboarding()
    }, [])


    const handleAccountToggle = (account) => {
        setSelectedAccounts((prev) => {
            const alreadySelected = prev.find(a => a.id === account.id);

            if (alreadySelected) {
                // remove from right side
                return prev.filter(a => a.id !== account.id);
            } else {
                //  add to right side
                return [...prev, account];
            }
        });
    };

    return (
        <div>
            <div className=' w-full'>
                <form onSubmit={submithandlerAddUser} className='p-4 bg-white mx-auto w-[80vw]'>
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
                    {/* this is for customer */}
                    <div className='mt-5'>
                        {
                            adduserData.role === "customer" ?
                                <div className='flex items-center justify-between gap-10 w-[1000px] py-2'>
                                    {/* left side */}
                                    <div className="rounded-md border border-gray-300 w-1/2">
                                        <div className='bg-sky-200 w-full px-2 py-3 flex justify-between rounded-t-md'>
                                             <h3 className="font-semibold mb-2">Choose Account ID's to Associate</h3>
                                             <h3>{onboardingAccoutList.length} Available</h3>
                                        </div>

                                        <div className="h-64 overflow-y-auto">
                                            {
                                                onboardingAccoutList.map((item,index) => (
                                                    <label key={item.id} className={`${index%2==0 ? 'bg-gray-100': 'bg-white'} flex items-center gap-2 mb-2 pl-4 cursor-pointer w-full h-10`} >
                                                        <input className='w-4 h-4' type="checkbox" checked={selectedAccounts.some(acc => acc.id === item.id)} onChange={() => handleAccountToggle(item)} />
                                                        <span className='text-lg'>{item.accountName}</span>
                                                    </label>
                                                ))}
                                        </div>
                                    </div>
                                    {/*  */}
                                     <div className='flex flex-col gap-10'>
                                        {/* left button */}
                                        <div className=' w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center'>
                                            <ArrowForwardIcon/>
                                        </div>
                                        {/* right button */}
                                        <div className=' w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center'><ArrowBackIcon/></div>
                                    </div>


                                    {/* right side */}
                                    <div className="rounded-md border border-gray-300 w-1/2">
                                       <div className='bg-sky-200 w-full px-2 py-3  flex justify-between rounded-t-md'>
                                          <h3 className="font-semibold mb-2">Associate Accounts ID's</h3>
                                          <h3>{selectedAccounts.length > 0 ? selectedAccounts.length : 0} Available</h3>
                                       </div>

                                        <div className="h-64 overflow-y-auto">
                                            {selectedAccounts.length > 0 ? (
                                                selectedAccounts.map((item,index) => (
                                                    <div key={item.id}  className={`${index%2==0 ? 'bg-gray-200': 'bg-white'} flex items-center gap-2 mb-2 pl-4 cursor-pointer w-full h-10`}   >
                                                        {item.accountName}
                                                    </div>
                                                ))
                                            ) : 
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

                    <button type='subimt' className='bg-sky-600 text-white text-center px-4 py-2 rounded mt-6 '>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddUser