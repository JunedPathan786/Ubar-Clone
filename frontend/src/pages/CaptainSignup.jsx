import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {
    const navigate = useNavigate()

    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [userData, setuserData] = useState({})

    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')

    const { captain, setCaptain } = React.useContext(CaptainDataContext)

    const submitHandler = async (e) => {
        e.preventDefault();
        const captainData = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
            }
        }
        
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

        if (response.status === 201) {
            const data = response.data
            setCaptain(data.captain)
            localStorage.setItem('token', data.token)
            navigate('/captain-home')
        }

        setemail('')
        setpassword('')
        setfirstName('')
        setlastName('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')
    }
    return (
        <div>
            <div className='px-5 py-5 flex flex-col justify-between h-screen bg-[#f3f3f3]'>
                <div>
                    <img className='w-20 mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
                    <form onSubmit={(e) => {
                        submitHandler(e);
                    }}>
                        <h3 className='text-lg font-medium mb-2'>What's our Captain's name</h3>
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
                        <h3 className='text-lg font-medium mb-2'>What's our captain's email</h3>
                        <div>
                            <input required className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com' value={email} onChange={(e) => { setemail(e.target.value) }} />
                        </div>
                        <h3 className='text-lg font-medium  mb-2'>What's your password</h3>
                        <input className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required type="password" placeholder='password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
                        <div className='flex gap-4 mb-7'>
                            <input
                                required
                                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                                type="text"
                                placeholder='Vehicle Color'
                                value={vehicleColor}
                                onChange={(e) => {
                                    setVehicleColor(e.target.value)
                                }}
                            />
                            <input
                                required
                                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                                type="text"
                                placeholder='Vehicle Plate'
                                value={vehiclePlate}
                                onChange={(e) => {
                                    setVehiclePlate(e.target.value)
                                }}
                            />
                        </div>
                        <div className='flex gap-4 mb-7'>
                            <input
                                required
                                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                                type="number"
                                placeholder='Vehicle Capacity'
                                value={vehicleCapacity}
                                onChange={(e) => {
                                    setVehicleCapacity(e.target.value)
                                }}
                            />
                            <select
                                required
                                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                                value={vehicleType}
                                onChange={(e) => {
                                    setVehicleType(e.target.value)
                                }}
                            >
                                <option value="" disabled>Select Vehicle Type</option>
                                <option value="car">Car</option>
                                <option value="auto">Bike</option>
                                <option value="moto">Auto</option>
                            </select>
                        </div>

                        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Create Captain Account</button>
                        <p className='text-center'> Already have a account?<Link to="/captain-login" className='text-blue-600'> Login here.</Link></p>
                    </form>
                </div>
                <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
                    Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
            </div>
        </div>
    )
}

export default CaptainSignup