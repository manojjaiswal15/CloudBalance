import React from 'react'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LaptopWindowsIcon from '@mui/icons-material/LaptopWindows';
import { NavLink } from 'react-router-dom';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useSelector } from 'react-redux';

const SideBarDetails = [
  { id: 1, title: "User Management", element: <GroupAddIcon />, path: "/dashboard/users" },
  { id: 2, title: "User Onboarding", element: <LaptopWindowsIcon />, path: "/dashboard/onboarding" },
  { id: 3, title: "Cost Explorer", element: <AttachMoneyIcon />, path: "/dashboard/cost" },
  { id: 4, title: "AWS Services", element: <FilterDramaIcon />, path: "/dashboard/aws" },
];

const SiderBar = ({sideclose}) => {
  
   const {user}=useSelector(store=>store.auth)
   
   const sideBarRoleBasedDetails= (user.role=='customer' ? SideBarDetails.slice(2,4): SideBarDetails)

  return (
    <nav className="flex flex-col p-2">
      {sideBarRoleBasedDetails.map((item) => (
        <NavLink key={item.id}  to={item.path}  className={({ isActive }) =>   `active-tab flex items-center gap-4 p-4 rounded transition-colors duration-150
             ${isActive ? 'bg-sky-500 text-white' : ' hover:bg-sky-100'}`
          }
        >
          <div className="p-1 rounded">
            {item.element}
          </div>

          <p className={`${sideclose ? 'hidden':'text-md font-semibold'}`}>{item.title}</p>
        </NavLink>
      ))}
    </nav>
  );
}

export default SiderBar;
