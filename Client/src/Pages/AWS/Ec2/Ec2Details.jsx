import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AwsTableDetail from '../../../Components/AWS/Table';
import { ec2Instances } from '../config/config';

const Ec2Details = () => {
  return (
    <section className='container mx-auto'>
        {/* graphs for  */}



        {/* table for */}
        <div>
            {/* search for */}
            <div className='flex items-center justify-between'>
                <h3 className='text-2xl font-bold'>Resourses</h3>
               <div className='max-w-3/12 bg-white rounded px-3 py-2 flex items-center gap-2 border-gray-300 border'>
                <SearchIcon/>
                 <input className='w-full outline-none' type="text" placeholder='Search'/>
               </div>
            </div>
            {/* table for */}
            <div>
                <AwsTableDetail data={ec2Instances}/>
            </div>
        </div>
    </section>
  )
}

export default Ec2Details