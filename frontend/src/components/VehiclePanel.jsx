import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center absolute top-0  w-[93%]' onClick={() => { props.setisVehiclePanelOpen(false) }}><i className='text-gray-200 text-2xl py-10 ri-arrow-down-wide-line'></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle </h3>
             {/* THIS IS FOR Car  */}
            <div onClick={()=>{props.setConfirmRidePanel(true)}} className='p-3 w-full border-2 active:border-black mb-2 rounded-xl flex items-center justify-between'>
                <img className="h-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjLVR8Lf9hGI4I88v4Icr_1lgho1iyA0J4Rw&s" alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className='font-medium text-sm'>2 min away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable compact rides</p>
                </div>
                <h2 className='text-xl font-lg'>₹193.3</h2>
            </div>
            {/* THIS IS FOR Bike  */}
            <div onClick={()=>{props.setConfirmRidePanel(true)}} className='p-3 w-full border-2 active:border-black mb-2 rounded-xl flex items-center justify-between'>
                <img className="h-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjLVR8Lf9hGI4I88v4Icr_1lgho1iyA0J4Rw&s" alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>UberMoto <span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h5 className='font-medium text-sm'>3 min away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable Bike rides</p>
                </div>
                <h2 className='text-xl font-lg'>₹65.20</h2>
            </div>
            {/* THIS IS FOR Auto */}
            <div onClick={()=>{props.setConfirmRidePanel(true)}} className='p-3 w-full border-2 active:border-black mb-2 rounded-xl flex items-center justify-between'>
                <img className="h-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjLVR8Lf9hGI4I88v4Icr_1lgho1iyA0J4Rw&s" alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                    <h5 className='font-medium text-sm'>3 min away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
                </div>
                <h2 className='text-xl font-lg'>₹118.86</h2>
            </div>
        </div>
    )
}

export default VehiclePanel