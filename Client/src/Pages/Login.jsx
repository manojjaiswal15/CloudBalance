import React, { useState, useEffect } from 'react'
import Logo from '../assets/logo/logo.png'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/userReducer/userAction'

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

        if (!loginDetails.email || !loginDetails.password) {
            toast.error(error);
            return;
        }

        dispatch(login(loginDetails.email, loginDetails.password));
    };

    // useEffect(() => {
    //     if (isAuthenticated && user) {
    //         toast.success("Login Successfully");
    //         navigate("/dashboard");
    //     localStorage.setItem("token", JSON.stringify(user))

    //     }

    // }, [isAuthenticated, user, navigate]);
    useEffect(() => {
        if (isAuthenticated) {
            toast.success("Login Successfully");
            navigate("/dashboard");
        }
    }, [isAuthenticated, user]);


    useEffect(() => {
        if (error) {
            toast.error(error);
            navigate('/')
            dispatch(logout())
        }
    }, [error]);


    return (
        <main className='flex items-center justify-center w-full h-screen'>
            <div className='w-[600px] p-8 shadow-2xl'>
                <form onSubmit={loginHandler} className='flex flex-col items-center justify-center gap-8 w-full'>
                    <img width={300} src={Logo} alt="" />
                    <div className='flex flex-col items-start justify-center w-full gap-2'>
                        <label className='text-lg font-semibold' htmlFor="email">Email</label>
                        <input value={loginDetails.email} onChange={(e) => changeHandler(e)} className='w-full border border-gray-400 h-10 px-2' type="email" required  name="email" placeholder='Enter your mail' />
                    </div>
                    <div className='flex flex-col items-start justify-center w-full gap-2'>
                        <label className='text-lg font-semibold' htmlFor="password">Password</label>
                        <input value={loginDetails.password} onChange={(e) => changeHandler(e)} className='w-full border border-gray-400 h-10 px-2' type="password" required name="password" placeholder='Enter your password' />
                    </div>
                    <button type="submit" className='bg-sky-600 text-white text-xl text-center w-full h-10 rounded cursor-pointer hover:drop-shadow-2xl duration-150'>Login</button>
                </form>
            </div>
        </main>
    )
}

export default Login