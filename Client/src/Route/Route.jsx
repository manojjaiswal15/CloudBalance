import React from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
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
import ProtectedRoute from './ProtectedRoute'
import UserOnboardingPage from '../Pages/Onboarding/IAM/UserOnboardingPage'
import { useSelector } from 'react-redux'
import NotFound from '../Pages/NotFound/NotFound'


const Route = () => {
  const {user}=useSelector(state=>state.auth)
  const pageRoleBased=user?.role==='customer' ? 'cost' : 'users'
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: '/dashboard',
      element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      children: [
        {
          index: true,
          element: <Navigate to={pageRoleBased} replace />,
        },
        {
          path: 'users',
          element: <User />,
        },
        {
          path: 'users/create',
          element: <AddUser />
        },
        {
          path: `users/edit/:id`,
          element: <EditUser />
        },
        {
          path: 'cost',
          element: <CostExplorer />
        },
        {
          path: 'aws',
          element: <AwsExplorer />,
          children: [
            {
              index: true,
              element: <Navigate to="ec2" replace />
            },
            {
              path: 'ec2',
              element: <Ec2Details />
            }, {
              path: 'rds',
              element: <RDSDetails />
            }, {
              path: 'asg',
              element: <ASGDetails />
            }
          ]
        },
        {
          path: 'onboarding',
          element: <UserOnboarding />,
        },
        {
          path:'onboarding/add',
          element:<UserOnboardingPage/>
        }
        
      ]
    },
    {
      path: '*',
      element:<NotFound/>
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default Route