import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
  const navigate = useNavigate()

  async function endRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

      rideId: props.ride._id


    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (response.status === 200) {
      navigate('/captain-home')
    }

  }
  return (
    <div>
      <h5 className='p-1 text-center absolute top-0  w-[93%]' onClick={() => { props.setfinishRidePanel(false) }}><i className='text-gray-200 text-2xl ri-arrow-down-wide-line'></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>Finish this ride</h3>

      <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3'>
          <img className='h-12 w-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8yH28oCwZAmn1TCMUeevvaobN7aba_v0VK9mGic1SpeHhYCoxM6qeWyjDysj4YSYU2PU&usqp=CAU" alt='' />
          <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2Km</h5>
      </div>
      <div className='flex flex-col gap-2 justify-between items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>563/11-A</h3>
              <p className='text-sm -m-1 text-gray-600'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2' >
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>563/11-A</h3>
              <p className='text-sm -m-1 text-gray-600'>{props.ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
              <p className='text-sm -m-1 text-gray-600'>Cash cash</p>
            </div>
          </div>
        </div>
        <div className='mt-10 w-full'>
          <button
            onClick={endRide}
            className='w-full mt-5 flex  text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Finish Ride</button>

          <p className='text-xs mt-10 '>click on finish if you have completed the payments</p>
        </div>
      </div>
    </div>
  )
}

export default FinishRide