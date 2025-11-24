import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../Pages/Login'
import Dashboard from '../Components/Dashboard'
import User from '../Pages/User/User'
import AddUser from '../Pages/User/addUser/AddUser'
import CostExplorer from '../Pages/Cost Explorer/CostExplorer'
import AwsExplorer from '../Pages/AWS/AwsExplorer'
import UserOnboarding from '../Pages/Onboarding/UserOnboarding'
import EditUser from '../Pages/User/EditUser/EditUser'
import Ec2Details from '../Pages/AWS/Ec2/Ec2Details'
import RDSDetails from '../Pages/AWS/RDS/RDSDetails'
import ASGDetails from '../Pages/AWS/ASG/ASGDetails'


const Route = () => {
     const router=createBrowserRouter([
    {
      path:"/",
      element:<Login/>
    },
    {
      path:'/dashboard',
      element:<Dashboard/>,
      children:[
        {
        index: true,
        element: <User />,   
      },
        {
          path:'users',
          element:<User/>,
        },
        {
          path:'users/create',
          element:<AddUser/>
        },
        {
          path:'users/edit',
          element:<EditUser/>
        },
        {
          path:'cost',
          element:<CostExplorer/>
        },
        {
          path:'aws',
          element:<AwsExplorer/>,
          children:[
            {
              index:true,
              element:<Ec2Details/>
            },
           {
             path:'ec2',
             element:<Ec2Details/>
           },{
             path:'rds',
             element:<RDSDetails/>
           },{
             path:'asg',
             element:<ASGDetails/>
           }
          ]
        },
        {
          path:'onboarding',
          element:<UserOnboarding/>
        }
      ]
    }
  ])
  return (
   <RouterProvider router={router}/>
  )
}

export default Route