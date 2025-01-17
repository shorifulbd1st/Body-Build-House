import React from 'react'
import Dashboard from '../pages/Dashboard/Dashboard'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    return (
        <div className='flex'>
            <Dashboard></Dashboard>
            {/* <Sidebar></Sidebar> */}
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default DashboardLayout
