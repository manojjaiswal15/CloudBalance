import React from "react";
import { userTableDemoDetails } from "../utils";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';


const UserTable = () => {
  const navigate=useNavigate()
  return (
    <div className="p-4 bg-white overflow-y-auto" style={{maxHeight:'60vh'}}>
      <table className="w-full">
        <thead className="bg-sky-200">
          <tr className="border-e">
            <th className="border-e border-gray-200 p-2">Id</th>
            <th className="border-e border-gray-200 p-2">First Name</th>
            <th className="border-e border-gray-200 p-2">Last Name</th>
            <th className="border-e border-gray-200 p-2">Email</th>
            <th className="border-e border-gray-200 p-2">Role</th>
            <th className="border-e border-gray-200 p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {userTableDemoDetails.map((item) => (
            <tr className={`border-e text-center ${(item.id%2==0)? 'bg-gray-200' : ''}`} key={item.id}>
              <td className="border-e border-gray-200  p-2">{item.id}</td>
              <td className="border-e border-gray-200 p-2">{item.firstName}</td>
              <td className="border-e border-gray-200 p-2">{item.lastName}</td>
              <td className="border-e border-gray-200 p-2">{item.email}</td>
              <td className="border-e border-gray-200 p-2">{item.role}</td>
              <td onClick={()=>{navigate('/dashboard/users/edit')}} className="border-e border-gray-200 p-2 cursor-pointer text-blue-600"><EditIcon/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
