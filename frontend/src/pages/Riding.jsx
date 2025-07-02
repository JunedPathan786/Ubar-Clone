import React from 'react'
import { Link, useLocation } from 'react-router-dom' // Added useLocation
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {} // Retrieve ride data
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    socket.on("ride-ended", () => {
        navigate('/home')
    })


    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed h-10 w-10 bg-white flex items-center justify-center rounded-full right-2 top-2'>
                <i className='ri-home-5-line text-lg font-medium'></i>
            </Link>
            <div className='h-1/2'>
                <LiveTracking />
            </div>
            <div className='h-1/2'>
                <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='h-12 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjLVR8Lf9hGI4I88v4Icr_1lgho1iyA0J4Rw&s" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                        <p className='text-sm text-gray-600'>Mahindra Thar</p>
                    </div>
                </div>
                <div className='flex flex-col gap-2 justify-between items-center'>
                    <div className='w-full mt-5'>
                        <div className='flex items-center gap-5 p-3 border-b-2' >
                            <i className="text-lg ri-map-pin-2-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>563/11-A</h3>
                                <p className='text-sm -m-1 text-gray-600'>{ride?.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3'>
                            <i className="text-lg ri-currency-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                                <p className='text-sm -m-1 text-gray-600'>Cash cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg mt-5'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding