import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center absolute top-0  w-[93%]' onClick={() => { props.setisVehiclePanelOpen(false) }}><i className='text-gray-200 text-2xl py-10 ri-arrow-down-wide-line'></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle </h3>
             {/* THIS IS FOR Car  */}
            <div onClick={()=>{
                props.setConfirmRidePanel(true)
                props.selectvehicle('car')
                }} className='p-3 w-full border-2 active:border-black mb-2 rounded-xl flex items-center justify-between'>
                <img className="h-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjLVR8Lf9hGI4I88v4Icr_1lgho1iyA0J4Rw&s" alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className='font-medium text-sm'>2 min away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable compact rides</p>
                </div>
                <h2 className='text-xl font-lg'>₹{props.fare.car}</h2>
            </div>
            {/* THIS IS FOR Bike  */}
            <div onClick={()=>{
                props.setConfirmRidePanel(true)
                props.selectvehicle('bike')
                }} className='p-3 w-full border-2 active:border-black mb-2 rounded-xl flex items-center justify-between'>
                <img className="h-10" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>Uberbike <span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h5 className='font-medium text-sm'>3 min away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable Bike rides</p>
                </div>
                <h2 className='text-xl font-lg'>₹{props.fare.bike}</h2>
            </div>
            {/* THIS IS FOR Auto */}
            <div onClick={()=>{
                props.setConfirmRidePanel(true)
                props.selectvehicle('auto')
                }} className='p-3 w-full border-2 active:border-black mb-2 rounded-xl flex items-center justify-between'>
                <img className="h-10" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                    <h5 className='font-medium text-sm'>3 min away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
                </div>
                <h2 className='text-xl font-lg'>₹{props.fare.auto}</h2>
            </div>
        </div>
    )
}

export default VehiclePanel