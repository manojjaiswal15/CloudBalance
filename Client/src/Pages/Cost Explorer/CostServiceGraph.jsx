import React, { useEffect, useState } from 'react'
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
// import { dataSource } from './config';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { cost_base_url } from '../../Service/service';
import { costAllData } from "../../store/costReducer/costAction"
import useBuildFusionDataSource from '../../Hook/useBuildFusionDataSource';
import Table from '../../Components/Cost/Table';


charts(FusionCharts);


const CostServiceGraph = ({type}) => {
   console.log(type)
  const [chartActive,setChartActive]=useState("mscolumn2d");
  const [isLoading,setIsLoading]=useState(false)
  const token=localStorage.getItem("token")
  const {costdata}=useSelector(state=>state.cost)
  const dispatch=useDispatch()

  useEffect(()=>{
    const fetchCostAllData=async()=>{
     try {
      setIsLoading(true)
       const res=await axios.get(`${cost_base_url}/all?groupby=${type}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(res.data)
      dispatch(costAllData(res.data))
      // console.log(res.data)
      setIsLoading(false)
      console.log(costdata)
     } catch (error) {
      console.log(error)
     }
    }

    fetchCostAllData()
  },[token,dispatch,type])


  const datasource=useBuildFusionDataSource(costdata);
  
  return (
   isLoading? <div>loading......</div> : <div className=' bg-white w-full  px-4 '>
      <div className='bg-white flex justify-between items-center p-4  '>
        {/* heading */}
          <h2 className='text-gray-600 text-base'>Cost</h2>
          {/* icons for tabbing changing graph plot */}
        <div className='flex items-center justify-center'>
          <div onClick={()=>{setChartActive("mscolumn2d")}} className='border p-2 border-gray-300 text-gray-600 cursor-pointer'><BarChartIcon/></div>
        <div onClick={()=>{setChartActive("msline")}} className='border p-2 border-gray-300  text-gray-600 cursor-pointer'><TimelineIcon/></div>
        <div onClick={()=>{setChartActive("stackedcolumn2d")}} className='border p-2 border-gray-300  text-gray-600 cursor-pointer'><StackedBarChartIcon/></div>
        </div>
      </div>
        <div className='w-full border-gray-300 border py-2'>
             <ReactFusioncharts width={"100%"}   height="500"  type={chartActive}   dataFormat="JSON"   dataSource={datasource}   />
        </div>


        {/* this for table ui design */}

        <div>
           <Table costdata={costdata} type={type}/>
        </div>
    </div>
  )
}

export default CostServiceGraph







