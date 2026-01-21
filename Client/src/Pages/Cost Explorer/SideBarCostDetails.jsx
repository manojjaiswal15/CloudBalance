import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GroupTabLabel } from './config'
import axios from 'axios'
import { cost_base_url } from '../../Service/service'
import { costAllData } from '../../store/costReducer/costAction'
import Loading from '../../Components/Loading/Loading'

const SideBarCostDetails = ({start,end}) => {
    // this is for side type like 
    const [sideSubType, setSideSubType] = useState([])
    // like service,instance_type and etc.
    const [activeFilter, setActiveFilter] = useState(null);
    // activeFitler to get sub part ec2,lamba
    const [selectSubType, setSelectSubType] = useState([]);
    const [filterValue,setFilterValue]=useState('')
     const {accountPerUserData}=useSelector(state=>state.accountperuser)
     const [isLoading,setIsLoading]=useState(false)
    const dispatch = useDispatch()


    const token = localStorage.getItem("token")

    function handleFilterSearch(e){
        setFilterValue(e.target.value)
        const filteredSubTypes = sideSubType.filter(item =>
    item.toLowerCase().includes(filterValue.toLowerCase())
);
    }


    async function getCostByFilterAndType() {
        const items = activeFilter.toLowerCase().trim().replace(/\s+/g, "_");
        const res = await axios.get(`${cost_base_url}/group?groupby=${items}&subtype=${selectSubType}&start=${start}&end=${end}&accountid=${accountPerUserData}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(costAllData(res.data))
    }

    async function syncSideBarToCostData(item) {
        setIsLoading(true)
        setActiveFilter(prev => (prev === item ? null : item));
        const items = item.toLowerCase().trim().replace(/\s+/g, "_");
        const res = await axios.get(`${cost_base_url}/filters?filter=${items}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setSideSubType(res.data)
        setIsLoading(false)
    }

    function selectedSubTypeValue(value) {
        setSelectSubType(prev => {
            if (prev.includes(value)) {
                // remove if already selected
                return prev.filter(v => v !== value);
            }
             else {
                // add if not selected
                return [...prev, value];
            }
        });
    }

    function selectedAllSubTypeValue() {
        // If all are already selected → unselect all
        if (selectSubType.length === sideSubType.length) {
            setSelectSubType([]);
        }
        // Else → select all
        else {
            setSelectSubType([...sideSubType]);
        }
    }

    function closeSidebar() {
  setActiveFilter(null);
  setSideSubType([]);
  setSelectSubType([]);
  setIsLoading(false);
}



    return (
        <div>
            <div className='flex items-center justify-between px-3 pt-2'>
                <h3 className='text-lg font-semibold'>Filters</h3>
                <p className='text-sm font-medium text-sky-700'>Reset All</p>
            </div>
            {/* on click to get sub type */}
            <div>
                {GroupTabLabel.map((item) => (
                    <div key={item} className="relative">
                        <div className="px-5 border-b border-gray-200 py-3 text-sm font-semibold flex items-center justify-between">
                            <div onClick={() => syncSideBarToCostData(item)} className="flex items-center gap-4 cursor-pointer">
                                <input className="w-5 h-5" type="checkbox" checked={""} onClick={(e) => e.stopPropagation()} />
                                {item}
                            </div>
                            <p className="text-xs font-light text-gray-600">Include Only</p>
                        </div>

                        {/* Sub Filters */}
                        {activeFilter === item && sideSubType.length > 0 && (
                            <div className="absolute bg-white w-full top-full px-3 pt-2 flex flex-col gap-3 max-h-80 overflow-y-scroll shadow rounded z-10">
                                <div className='sticky top-0 z-10 bg-white max-h-[20vh] py-2'>
                                    <span>{sideSubType.length > 0 ? "" : "No filters currently added."}</span>
                                    {/* <input onChange={(e)=>handleFilterSearch(e)} value={filterValue} className='w-full border border-gray-300 rounded px-2 h-8 py-3' type="text" placeholder='Search' /> */}
                                    <input value={filterValue} onChange={handleFilterSearch} className="w-full border border-gray-300 rounded px-2 h-8 py-3" type="text" placeholder="Search"/>

                                    <p className='text-sm font-semibold pt-2'>Showing {sideSubType.length} results</p>
                                    <label className="flex items-center gap-2 text-sm font-semibold">
                                        <input type="checkbox"  onChange={selectedAllSubTypeValue} checked={sideSubType.length > 0 &&   selectSubType.length === sideSubType.length  }  />
                                        Select All
                                    </label>

                                </div>
                                {/* loading  */}
                                {isLoading ?  <div> <Loading/></div> : sideSubType.map((items) => (
                                    <label key={items} className="flex items-center gap-2 text-sm">
                                        <input onChange={() => selectedSubTypeValue(items)} checked={selectSubType.includes(items)} name="subtypevaluegraph" type="checkbox" value={items} />
                                        {items}
                                    </label>
                                ))}
                                <div>
                                </div>
                                <div className='sticky bottom-0 bg-white border-t border-t-gray-200 flex items-end justify-end gap-4 py-2'>
                                    <button onClick={closeSidebar} className='px-3 py-1 text-sky-600 rounded border border-sky-600 cursor-pointer'>Close</button>
                                    <button onClick={getCostByFilterAndType} className='px-3 py-1 rounded bg-sky-600 text-white cursor-pointer'>Apply</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default SideBarCostDetails