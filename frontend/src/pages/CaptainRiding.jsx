import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

    const [finishRidePanel, setfinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])

    return (
        <div className='h-screen relative'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />
                <Link to='/captain-home' className='fixed h-10 w-10 bg-white flex items-center justify-center rounded-full right-2 top-2'>
                    <i className='ri-logout-box-r-line text-lg font-medium'></i>
                </Link>
            </div>
            <div className='h-4/5'>
                <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

            </div>
            <div className='h-1/5 p-6 bg-yellow-400 flex justify-between items-center pt-10 relative' onClick={() => { setfinishRidePanel(true) }}>
                <h5 className='p-1 text-center absolute top-0 w-[95%]'><i className='text-black text-2xl ri-arrow-up-wide-line'></i></h5>
                <h4 className='text-xl font-semibold'>4 Km away</h4>
                <button className=' bg-green-600 text-white font-semibold p-3 px-12 rounded-lg'>Comlete Ride</button>
            </div>
            <div ref={finishRidePanelRef} className='fixed z-10 w-full h-screen translate-y-full bottom-0 px-3 bg-white py-10 pt-12'>
                <FinishRide
                    ride={rideData}
                    setfinishRidePanel={setfinishRidePanel} />
            </div>

            <div className='h-screen fixed w-screen top-0 z-[-1]'>
                <LiveTracking />
            </div>
        </div>
    )
}

export default CaptainRiding

