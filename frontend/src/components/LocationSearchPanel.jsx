import React from 'react'

const LocationSearchPanel = (props) => {


    //samplw for array of object
    const locations = ['At post Prathmesha banglow nashik, 42207',
        "At post Manholtra banglow nashik, 42207",
        'At post Kapoor banglow nashik, 42108',
        "At post Juned banglow nashik, 42564",
    ]

    return (
        <div>
            {/* This is a simaple location */}
            {
                locations.map(function (elem, idx) {
                    return <div key={idx} onClick={()=> {
                        props.setisVehiclePanelOpen(true)
                        props.setpanelOpen(false)
                    }} className='flex items-center justify-start gap-4 my-2  border-2 border-gray-50 active:border-black p-3 rounded-xl'>
                        <h2 className='bg-[#eee] h-8  w-12  flex items-center justify-center rounded-full'>
                            <i className="ri-map-pin-fill"></i>
                        </h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                })
            }

        </div>
    )
}

export default LocationSearchPanel