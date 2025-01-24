import React, { useContext, useEffect, useState } from 'react'
import Dashboard from '../pages/Dashboard/Dashboard'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
import useAdmin from '../hooks/useAdmin'
import useUsers from '../hooks/useUsers'
import useAxiosSecure from '../hooks/useAxiosSecure'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import IsAdmin from '../pages/Dashboard/IsAdmin'
import IsMember from '../pages/Dashboard/IsMember'
import IsTrainer from '../pages/Dashboard/IsTrainer'

const DashboardLayout = () => {
    const { user, loading } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        const userFun = async () => {
            const res = await axiosSecure.get(`/user/${user?.email}`);
            setUserData(res.data);
        }
        userFun();
    }, [user?.email])
    if (!userData) {
        return <LoadingSpinner></LoadingSpinner>
    }
    // console.log(userData.role)
    return (
        <div className='lg:grid grid-cols-12 gap-4 '>
            <div className='col-span-3 '>
                {
                    userData && userData.role === 'admin' ? <IsAdmin></IsAdmin> : userData.role === 'member' ? <IsMember></IsMember> : <IsTrainer></IsTrainer>
                }
            </div>
            {/* <Sidebar></Sidebar> */}
            <div className=' col-span-9 '>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default DashboardLayout
