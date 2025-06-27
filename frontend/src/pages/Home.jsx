import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

const Home = () => {
  const [pickup, setpickup] = useState('')
  const [destination, setdestination] = useState('')
  const [panelOpen, setpanelOpen] = useState(false)
  const isVehiclePanelOpenRef = useRef(null)
  const ConfirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [isVehiclePanelOpen , setisVehiclePanelOpen ] = useState(false)
  const [ConfirmRidePanel, setConfirmRidePanel] = useState(false)

  const [vehicleFound, setvehicleFound] = useState(false)
  const [waitingForDriver, setwaitingForDriver] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24,
        opacity: 1
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (isVehiclePanelOpen ) {
      gsap.to(isVehiclePanelOpenRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(isVehiclePanelOpenRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [isVehiclePanelOpen ])

  useGSAP(function () {
    if (ConfirmRidePanel) {
      gsap.to(ConfirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ConfirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ConfirmRidePanel])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />
      <div className='h-screen w-full'>
        <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='flex flex-col absolute justify-end h-screen w-full top-0'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => {
            setpanelOpen(false)
          }} className='absolute opacity-0 right-6 top-6 text-2xl'>
            <i className="ri-arrow-down-wide-fill"></i>
          </h5>
          <h4 className=' text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className="line absolute h-16 w-1 top-[43%] left-10 bg-gray-900 rounded-xl"></div>
            <input onClick={() => { setpanelOpen(true) }} value={pickup} onChange={(e) => { setpickup(e.target.value) }} className="bg-[#eeee] px-12 py-2 text-lg rounded-lg w-full mt-5" type="text" placeholder='Add a pick-up location' />
            <input onClick={() => { setpanelOpen(true) }} value={destination} onChange={(e) => { setdestination(e.target.value) }} className="bg-[#eeee] px-12 py-2 text-lg rounded-lg w-full mt-5" type="text" placeholder='Enter your destination' />
          </form>
        </div>
        <div ref={panelRef} className='h-0 bg-white'>
          <LocationSearchPanel setpanelOpen={setpanelOpen} setisVehiclePanelOpen={setisVehiclePanelOpen} />
        </div>
      </div>

      <div ref={isVehiclePanelOpenRef} className='fixed z-10 w-full bottom-0 translate-y-full px-3 bg-white py-10 pt-12'>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setisVehiclePanelOpen={setisVehiclePanelOpen } />
      </div>
      <div ref={ConfirmRidePanelRef} className='fixed z-10 w-full bottom-0 translate-y-full px-3 bg-white py-6 pt-12'>
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setvehicleFound={setvehicleFound} />
      </div>
      <div ref={vehicleFoundRef} className='fixed z-10 w-full bottom-0 translate-y-full px-3 bg-white py-6 pt-12'>
        <LookingForDriver setvehicleFound={setvehicleFound} />
      </div>
      <div ref={waitingForDriverRef} className='fixed z-10 w-full bottom-0 px-3 bg-white py-6 pt-12'>
        <WaitingForDriver waitingForDriver={waitingForDriver}/>
      </div>
      
    </div>
  )
}

export default Home