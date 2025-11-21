import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../Pages/Login'
import Dashboard from '../Components/Dashboard'
import User from '../Pages/User/User'
import AddUser from '../Pages/addUser/AddUser'
import CostExplorer from '../Pages/Cost Explorer/CostExplorer'
import AwsExplorer from '../Pages/AWS/AwsExplorer'
import UserOnboarding from '../Pages/Onboaring/UserOnboarding'

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
          children:[
            {
              path:'create',
              element:<AddUser/>
            }
          ]
        },
        {
          path:'cost',
          element:<CostExplorer/>
        },
        {
          path:'aws',
          element:<AwsExplorer/>
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