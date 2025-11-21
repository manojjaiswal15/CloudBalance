import React from 'react'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LaptopWindowsIcon from '@mui/icons-material/LaptopWindows';
import { NavLink } from 'react-router-dom';

const SideBarDetails = [
  { id: 1, title: "User Management", element: <GroupAddIcon />, path: "/dashboard/users" },
  { id: 2, title: "User Onboarding", element: <LaptopWindowsIcon />, path: "/dashboard/onboarding" },
  { id: 3, title: "Cost Explorer", element: <GroupAddIcon />, path: "/dashboard/cost" },
  { id: 4, title: "AWS Services", element: <GroupAddIcon />, path: "/dashboard/aws" },
];

const SiderBar = ({sideclose}) => {
  return (
    <nav className="flex flex-col p-2">
      {SideBarDetails.map((item) => (
        <NavLink key={item.id}  to={item.path}  className={({ isActive }) =>   `flex items-center gap-4 p-4 rounded transition-colors duration-150
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
