import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import TuneIcon from '@mui/icons-material/Tune';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from  '@mui/icons-material/KeyboardArrowUp';
import CostServiceGraph from './CostServiceGraph';

const GroupTabGraph = () => {
  const [moreDetails,setMoreDetails]=useState(false)
  const [sliderDetails,setSliderDetails]=useState(false)
  return (
    <div>
      <div className='bg-transparent shadow-2xl mt-10 p-6 border border-gray-300 rounded'>
        {/* tabbing for */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <h3 className='text-sm font-semibold'>Group By :</h3>
            <div className='flex items-center justify- gap-3'>
              <div className='px-4 border-r border-b-black'><div className='bg-blue-700 text-sm text-white px-4 py-1 rounded'>Service</div></div>
              <div className='px-4 py-1 text-sm  rounded border border-gray-300 bg-white text-blue-600'>Service</div>
              <div className='px-4 py-1 text-sm rounded border border-gray-300 bg-white text-blue-600'>Service</div>
              <div className='px-4 py-1 text-sm  rounded border border-gray-300 bg-white text-blue-600'>Service</div>
              <div className='px-4 py-1 text-sm rounded border border-gray-300 bg-white text-blue-600'>Service</div>
              <div className='px-4 py-1 text-sm rounded border border-gray-300 bg-white text-blue-600'>Service</div>
              <div onClick={()=>setMoreDetails(!moreDetails)} className=' relative flex items-center text-blue-600'>More {moreDetails ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                <div className={`${moreDetails? "bg-white flex flex-col h-[20vh] w-[8vw] z-50 absolute top-7 py-4 gap-3 text-center text-sm text-gray-600 list-none border border-gray-300 rounded" : "hidden" }`}>
                  <li>Service</li>
                  <li>Service</li>
                  <li>Service</li>
                  <li>Service</li>
                  <li>Service</li>
                  <li>Service</li>
                </div>
              </div>
            </div>
          </div>
          {/* icons */}
          <div onClick={()=>setSliderDetails(!sliderDetails)} className='p-1 border border-blue-700'>
            <TuneIcon className='text-blue-700' />
          </div>
        </div>
      </div>
     <div className='flex'>
       <CostServiceGraph/>
       <div className={`${sliderDetails ? 'w-[20vw] h-[75vh] bg-white border border-gray-300  duration-300 translate-x-0': 'translate-x-32 w-0'}`}>
        hello
       </div>
     </div>
    </div>
  )
}

export default GroupTabGraph