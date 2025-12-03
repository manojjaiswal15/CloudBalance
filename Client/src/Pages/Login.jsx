import React, { useState,useEffect } from 'react'
import Logo from '../assets/logo/logo.png'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/userReducer/userAction'

const Login = () => {
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const { user, isAuthenticated, error } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    // statevalue handle
    function changeHandler(e) {
        setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
    }

    // login
    const loginHandler = (e) => {
        e.preventDefault();
        console.log(loginDetails)
        if (loginDetails.email && loginDetails.password) {
            dispatch(login(loginDetails.email, loginDetails.password));
        }
    }

   useEffect(() => {
    console.log('Auth state changed:', { user, isAuthenticated, error });
    if (user && isAuthenticated) {
      navigate('/dashboard');
      toast.success("Login SuccessFully")
    }
    else{
        toast.error("Incorrect Password and Email")
    }
  }, [isAuthenticated, user]);
    
    return (
        <main className='flex items-center justify-center w-full h-screen'>
            <div className='w-[600px] p-8 shadow-2xl'>
                <div className='flex flex-col items-center justify-center gap-8 w-full'>
                    <img width={300} src={Logo} alt="" />
                    <div className='flex flex-col items-start justify-center w-full gap-2'>
                        <label className='text-lg font-semibold' htmlFor="email">Email</label>
                        <input value={loginDetails.email} onChange={(e) => changeHandler(e)} className='w-full border border-gray-400 h-10 px-2' type="email" required name="email" placeholder='Enter your mail' />
                    </div>
                    <div className='flex flex-col items-start justify-center w-full gap-2'>
                        <label className='text-lg font-semibold' htmlFor="password">Password</label>
                        <input value={loginDetails.password} onChange={(e) => changeHandler(e)} className='w-full border border-gray-400 h-10 px-2' type="password" required name="password" placeholder='Enter your password' />
                    </div>
                    <button onClick={(e) => { loginHandler(e) }} className='bg-sky-600 text-white text-xl text-center w-full h-10 rounded cursor-pointer hover:drop-shadow-2xl duration-150'>Login</button>
                </div>
            </div>
        </main>
    )
}

export default Login