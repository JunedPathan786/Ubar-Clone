import React, { useRef, useState, useContext, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import axios from 'axios';
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/userContext'


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
  const [isVehiclePanelOpen, setisVehiclePanelOpen] = useState(false)
  const [ConfirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setvehicleFound] = useState(false)
  const [waitingForDriver, setwaitingForDriver] = useState(false)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({});
  const [vehicleType, setvehicleType] = useState(null);
  const [ride, setRide] = useState(null)


  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
  }, [user])

  socket.on('ride-confirmed', ride => {
    setvehicleFound(false)
    setwaitingForDriver(true)
    setRide(ride)
  })

  const handlePickupChange = async (e) => {
    setpickup(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }

      })
      setPickupSuggestions(response.data)
    } catch {
      // handle error
    }
  }

  const handleDestinationChange = async (e) => {
    setdestination(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data)
    } catch {
      // handle error
    }
  }

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
    if (isVehiclePanelOpen) {
      gsap.to(isVehiclePanelOpenRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(isVehiclePanelOpenRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [isVehiclePanelOpen])

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


  async function findTrip() {
    setisVehiclePanelOpen(true);
    setpanelOpen(false);

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log("🚗 Fare:", response.data);
      setFare(response.data);
    } catch (error) {
      console.error("❌ Trip fetch error:", error?.response?.status, error?.response?.data);
      alert("Could not calculate fare. Try again with valid locations.");
    }
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response.data)
  }

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
            <div className="line absolute h-16 w-1 top-[37%] left-10 bg-gray-900 rounded-xl"></div>
            <input onClick={() => {
              setpanelOpen(true)
              setActiveField('pickup')
            }} value={pickup} onChange={handlePickupChange} className="bg-[#eeee] px-12 py-2 text-lg rounded-lg w-full mt-5" type="text" placeholder='Add a pick-up location' />

            <input onClick={() => {
              setpanelOpen(true)
              setActiveField('destination')
            }} value={destination} onChange={handleDestinationChange} className="bg-[#eeee] px-12 py-2 text-lg rounded-lg w-full mt-5" type="text" placeholder='Enter your destination' />
          </form>
          <button
            onClick={findTrip}
            className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className='h-0 bg-white'>
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setpickup={setpickup}
            setDestination={setdestination}
            activeField={activeField}
          />

        </div>
      </div>

      <div ref={isVehiclePanelOpenRef} className='fixed z-10 w-full bottom-0 translate-y-full px-3 bg-white py-10 pt-12'>
        <VehiclePanel
          selectvehicle={setvehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setisVehiclePanelOpen={setisVehiclePanelOpen} />
      </div>
      <div ref={ConfirmRidePanelRef} className='fixed z-10 w-full bottom-0 translate-y-full px-3 bg-white py-6 pt-12'>
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setvehicleFound={setvehicleFound} />
      </div>
      <div ref={vehicleFoundRef} className='fixed z-10 w-full bottom-0 translate-y-full px-3 bg-white py-6 pt-12'>
        <LookingForDriver
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setvehicleFound={setvehicleFound} />
      </div>
      <div ref={waitingForDriverRef} className='fixed z-10 w-full bottom-0 px-3 bg-white py-6 pt-12'>
        <WaitingForDriver 
        ride={ride}
        setvehicleFound={setvehicleFound}
        setwaitingForDriver={setwaitingForDriver}
        waitingForDriver={waitingForDriver} />
      </div>

    </div>
  )
}

export default Home