import React from 'react'
import GroupTabGraph from './GroupTabGraph'

const CostExplorer = () => {
  return (
    <div>
      {/* heading for */}
      <div className='py-2 border-b border-b-gray-300'>
        <h3 className='text-2xl font-bold '>Cost Explorer</h3>
        <p className='font-light text-sm'>How to always be aware of cost changes and history.</p>
      </div>
      <GroupTabGraph/>
    </div>
  )
}

export default CostExplorer