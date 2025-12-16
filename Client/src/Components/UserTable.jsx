import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import axios from "axios";

const UserTable = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [userTableDetails, setUserTableDetails] = useState([]);

  useEffect(() => {
    async function userTableDetails() {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/users"
        );
        setUserTableDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    }
    userTableDetails();
  }, []);

  return (
    <div className="p-4 bg-white overflow-y-auto" style={{ maxHeight: "60vh" }}>
      <table className="w-full">
        <thead className="bg-sky-200">
          <tr className="border-e">
            <th className="border-e border-gray-200 p-2">Id</th>
            <th className="border-e border-gray-200 p-2">First Name</th>
            <th className="border-e border-gray-200 p-2">Last Name</th>
            <th className="border-e border-gray-200 p-2">Email</th>
            <th className="border-e border-gray-200 p-2">Role</th>
            {user?.role === "admin" && (
              <th className="border-e border-gray-200 p-2">Action</th>
            )}
          </tr>
        </thead>

        <tbody>
          {userTableDetails.map((item, index) => (
            <tr
              key={item.id}
              className={`border-e text-center ${
                index % 2 === 0 ? "bg-gray-200" : ""
              }`}
            >
              <td className="border-e border-gray-200 p-2">{item.id}</td>
              <td className="border-e border-gray-200 p-2">
                {item.firstName}
              </td>
              <td className="border-e border-gray-200 p-2">
                {item.lastName}
              </td>
              <td className="border-e border-gray-200 p-2">{item.email}</td>
              <td className="border-e border-gray-200 p-2">{item.role}</td>

              {user?.role === "admin" && (
                <td
                  onClick={() =>
                    navigate(`/dashboard/users/edit/${item.id}`)
                  }
                  className="border-e border-gray-200 p-2 cursor-pointer text-blue-600"
                >
                  <EditIcon />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
