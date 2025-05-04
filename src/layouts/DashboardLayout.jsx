import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../pages/Dashboard/Dashboard";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useUsers from "../hooks/useUsers";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import IsAdmin from "../pages/Dashboard/IsAdmin";
import IsMember from "../pages/Dashboard/IsMember";
import IsTrainer from "../pages/Dashboard/IsTrainer";
// import { Menu } from 'react-icons/fa';
import { RxCross1 } from "react-icons/rx";
import { FaBars } from "react-icons/fa";
const DashboardLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const userFun = async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      setUserData(res.data);
    };
    userFun();
  }, [user?.email, axiosSecure]);
  if (!userData) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // console.log(isMenuOpen)
  return (
    <div className="lg:grid grid-cols-12 gap-4 relative border lg:border-0">
      {/* <div className={`lg:col-span-3 ${isMenuOpen ? 'block absolute' : 'hidden'} lg:block`}> */}
      <div
        className={`bg-[#0A273D] lg:bg-[#0A273D] lg:col-span-3 absolute inset-x-0 z-20 w-full transition-all duration-700 ease-in-out dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative  ${
          isMenuOpen
            ? "translate-x-0 opacity-100"
            : "opacity-0 -translate-x-full lg:opacity-100 lg:translate-x-0 "
        }`}
      >
        {userData && userData.role === "admin" ? (
          <IsAdmin></IsAdmin>
        ) : userData.role === "member" ? (
          <IsMember></IsMember>
        ) : (
          <IsTrainer></IsTrainer>
        )}
      </div>
      <button
        onClick={toggleMenu}
        className="lg:hidden btn p-4 text-xl absolute top-5 right-3 z-50 bg-gray-800 text-white rounded-full shadow-md"
      >
        {isMenuOpen ? (
          <RxCross1 className="text-xl" />
        ) : (
          <FaBars className="text-xl" />
        )}
      </button>

      <div className="lg:col-span-9 ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
