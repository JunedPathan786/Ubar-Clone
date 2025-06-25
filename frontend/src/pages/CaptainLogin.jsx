import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const Captainlogin = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [captain, setcaptain] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()
        setcaptain({
            email: email,
            password: password
        })
        setemail('')
        setpassword('')
    }
    return (
        <div className='p-7 flex flex-col justify-between h-screen bg-[#f3f3f3]'>
            <div>
                <img className='w-16 mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
                <form onSubmit={(e) => {
                    submitHandler(e);
                }}>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input required value={email} onChange={(e) => { setemail(e.target.value) }} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com' />
                    <h3 className='text-lg font-medium  mb-2'>What's your password</h3>
                    <input value={password} onChange={(e) => { setpassword(e.target.value) }} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required type="password" placeholder='password' />
                    <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Login</button>
                    <p className='text-center'> Join as fleet?<Link to="/captain-signup" className='text-blue-600'>Register as a captain.</Link></p>
                </form>
            </div>
            <Link to="/login" className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign in as user</Link>
        </div>
    )
}

export default Captainlogin