import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import TuneIcon from '@mui/icons-material/Tune';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CostServiceGraph from './CostServiceGraph';
import { GroupTabLabel } from './config';


const GroupTabGraph = () => {
  const [moreDetails, setMoreDetails] = useState(false)
  const [sliderDetails, setSliderDetails] = useState(false)
  const [graphLabelSplit, setGraphLabelSplit] = useState([]);
  const [restgraphLabelSplit, setRestGraphLabelSplit] = useState([]);
  const [activeTab, setActiveTab] = useState(GroupTabLabel[0]);

  // split tab label
  useEffect(() => {
    const remaining = GroupTabLabel.filter(label => label !== activeTab);
    const VISIBLE_COUNT = 5;
    setGraphLabelSplit(remaining.slice(0, VISIBLE_COUNT));
    setRestGraphLabelSplit(remaining.slice(VISIBLE_COUNT));
  }, [activeTab]);


  return (
    <div className='overflow-x-hidden'>
      <div className='bg-transparent shadow-2xl mt-6 p-6 border border-gray-300 rounded'>
        {/* tabbing for */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <h3 className='text-sm font-semibold'>Group By :</h3>

            {/* first graph label */}
            <div className='px-2 border-r border-gray-300'>
              <button className='px-4 py-1 text-sm  rounded border border-gray-300 bg-sky-600 text-white'>{activeTab}</button>
            </div>

            {/* graph label */}
            {
              graphLabelSplit.map((items) => {
                return <button onClick={() => { setActiveTab(items) }} className='px-4 cursor-pointer py-1 text-sm  rounded border border-gray-300 bg-white text-sky-600'>{items}</button>
              })
            }
            {/* after remain graph label */}
            <div onClick={() => setMoreDetails(!moreDetails)} className=' relative flex items-center text-blue-600'>More {moreDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              <div className={`transform transition duration-300 ${moreDetails ? "bg-white flex flex-col h-[28vh] w-[8vw] z-50 absolute top-7 py-4 gap-3 text-center text-sm text-gray-600 list-none border border-gray-300 rounded " : "hidden"}`}>
                {
                  restgraphLabelSplit.map((item) => {
                    return <li onClick={() => { setActiveTab(item) }} className='cursor-pointer'>{item}</li>
                  })
                }
              </div>
            </div>
          </div>
          {/* icons */}
          <div className='flex items-center gap-10'>
            {/* calender */}
            <div className='p-3 border border-gray-300 rounded'>
              <input className='outline-none bg-transparent ' type="date" />
            </div>
            {/* swipe */}
            <div onClick={() => setSliderDetails(!sliderDetails)} className={`p-1 border border-blue-700 cursor-pointer`}>
              <TuneIcon className='text-blue-700' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex'>
       <CostServiceGraph  sliderDetails={sliderDetails}/>
        <div className={`${sliderDetails ? 'w-[20vw] bg-white border border-gray-300  duration-300 translate-x-0' : 'w-0 translate-x-24'}`}>
          hello
        </div>
      </div>
    </div>
  )
}

export default GroupTabGraph