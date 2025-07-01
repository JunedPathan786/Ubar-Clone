import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/userContext'


const UserSignup = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [userData, setuserData] = useState({})

    const navigate = useNavigate();

    const { user, setuser } = React.useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
        if (response.status === 200) {
            const data = response.data;
            setuser(data.user);
            localStorage.setItem('token', data.token);
            // Redirect to home page after successful registration
            navigate('/home');
        }

        setemail('');
        setpassword('');
        setfirstName('');
        setlastName('');
    }

    return (
        <div>
            <div className='p-7 flex flex-col justify-between h-screen bg-[#f3f3f3]'>
                <div>
                    <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />
                    <form onSubmit={(e) => {
                        submitHandler(e);
                    }}>
                        <h3 className='text-lg font-medium mb-2'>What's your name</h3>
                        <div className='flex gap-4 mb-6'>
                            <input
                                required
                                className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                                type="text"
                                placeholder='First name'
                                value={firstName}
                                onChange={(e) => { setfirstName(e.target.value) }} />
                            <input required className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base' type="text" placeholder='Last name' value={lastName} onChange={(e) => { setlastName(e.target.value) }} />
                        </div>
                        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                        <div>
                            <input required className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com' value={email} onChange={(e) => { setemail(e.target.value) }} />
                        </div>
                        <h3 className='text-lg font-medium  mb-2'>What's your password</h3>
                        <input className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required type="password" placeholder='password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Create account</button>
                        <p className='text-center'> Already have a account?<Link to="/login" className='text-blue-600'> Login here.</Link></p>
                    </form>
                </div>
                <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
                    Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
            </div>
        </div>
    )
}

export default UserSignup