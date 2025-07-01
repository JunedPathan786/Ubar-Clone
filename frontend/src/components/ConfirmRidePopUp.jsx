import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const [otp, setotp] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
    }
    return (
        <div>
            <h5 className='p-1 text-center absolute top-0  w-[93%]' onClick={() => { props.setridePopUpPanel(false) }}><i className='text-gray-200 text-2xl ri-arrow-down-wide-line'></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>

            <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8yH28oCwZAmn1TCMUeevvaobN7aba_v0VK9mGic1SpeHhYCoxM6qeWyjDysj4YSYU2PU&usqp=CAU" alt='' />
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullnamw.firstname}</h2>
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
                <div className='mt-6 w-full'>
                    <form onSubmit={(e) => { submitHandler(e) }}>
                        <input value={otp} onChange={(e)=> setotp(e.target.value)} className="bg-[#eeee] px-6 py-4 text-lg rounded-lg font-mono w-full mt-3" type="text" placeholder='Enter OTP' />
                        <button className='w-full flex justify-center bg-green-600 text-white text-lg font-semibold p-3 rounded-lg mt-5 '>Confirm</button>
                        <button onClick={() => { props.setconfirmRidePopUpPanel(false), props.setridePopUpPanel(false) }} className='w-full  bg-red-500 text-white text-lg font-semibold p-3 rounded-lg mt-2 '>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp