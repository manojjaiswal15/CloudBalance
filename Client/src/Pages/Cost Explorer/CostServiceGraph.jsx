import React from 'react'
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import { dataSource } from './config';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';

charts(FusionCharts);

const CostServiceGraph = ({sliderDetails}) => {
  return (
    <div className=' bg-white  px-4 max-w-screen'>
      <div className='bg-white flex justify-between items-center p-4 '>
        {/* heading */}
          <h2 className='text-gray-600 text-base'>Cost</h2>
          {/* icons for tabbing changing graph plot */}
        <div className='flex items-center justify-center'>
          <div className='border p-2 border-gray-300 text-gray-600'><BarChartIcon/></div>
        <div className='border p-2 border-gray-300  text-gray-600'><TimelineIcon/></div>
        <div className='border p-2 border-gray-300  text-gray-600'><StackedBarChartIcon/></div>
        </div>
      </div>
        <div className='bg-white'>
             <ReactFusioncharts style={{backgroundColor:'white'}} width={`${sliderDetails ? 1200 : 1450}`} height="500" type="mscolumn2d"  dataFormat="JSON"  dataSource={dataSource}/>
        </div>
    </div>
  )
}

export default CostServiceGraph







