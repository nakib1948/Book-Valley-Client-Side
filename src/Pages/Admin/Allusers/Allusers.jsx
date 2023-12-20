import { useState } from "react";
import useGetAllUsers from "../../../hooks/useGetAllUsers";
import Loader from "../../Shared/Loader/Loader";
import AllusersTable from "./AllusersTable";

const Allusers = () => {
  const [data, isLoading, error, refetch] = useGetAllUsers();
  const [userType, setUserType] = useState("alluser");
  const [searchText, setSearchText] = useState("");

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredUsers = data.filter((user) => {
    if (userType === "alluser") {
      return true; 
    }
    return user.role === userType.toLowerCase();
  }).filter((user) => {
    if (searchText.trim() === "") {
      return true; 
    }
    return user.name.toLowerCase().includes(searchText.toLowerCase());
  });

 
  return (
    <div className="overflow-x-auto w-full card-body bg-slate-50 rounded-xl">
      <div className=" bg-blue-50/40 rounded-md">
        <h1 className="text-2xl font-semibold">User List</h1>
        <div className="flex justify-around ">
          <p className="text-gray-600">Total users: {filteredUsers.length}</p>
          <div className="flex flex-col">
            <select
              onChange={(e) => setUserType(e.target.value)}
              className="select mb-2 select-primary select-md"
            >
              <option value="alluser">All users</option>
              <option value="reader">Reader</option>
              <option value="writer">Writer</option>
              <option value="publisher">Publisher</option>
            </select>
            <input
              type="text"
              placeholder="Search user"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr className="text-base">
            <th className="text-base text-purple">Image</th>
            <th className="text-base text-purple">Name</th>
            <th className="text-base text-purple">Email</th>
            <th className="text-base text-purple">Role</th>
            <th className="text-base text-purple">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <AllusersTable user={user} refetch = {refetch} key={index}></AllusersTable>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Allusers;