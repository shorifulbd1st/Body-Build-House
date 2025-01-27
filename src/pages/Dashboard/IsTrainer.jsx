import React, { useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import { NavLink } from 'react-router-dom'
import CommonDashboard from './CommonDashboard'

const IsTrainer = () => {
    const { user } = useContext(AuthContext)
    // console.log(user)
    return (
        <div>
            <div>
                <aside className="flex flex-col h-full px-4 py-8 overflow-y-auto bg-white border-r-2  dark:bg-gray-900 dark:border-gray-700">

                    <h1 className="text-center flex">
                        <span className="text-2xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-lg">
                            Body Build House
                        </span>



                    </h1>
                    <div className="flex flex-col items-center mt-6 -mx-2">
                        <img referrerPolicy="no-referrer"
                            className="object-cover w-24 h-24 mx-2 rounded-full"
                            src={user?.photoURL}
                            alt="avatar"
                        />
                        <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">{user?.displayName}</h4>
                        <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400"></p>
                    </div>

                    <div className="flex flex-col justify-between flex-1 mt-6">
                        <nav>
                            <NavLink
                                to="/dashboard/manage-slot"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? "bg-gray-100 dark:bg-gray-800" : ""
                                    }`
                                }
                            >
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span className="mx-4 font-medium">Manage Slots</span>
                            </NavLink>

                            <NavLink
                                to="/dashboard/add-slot"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${isActive ? "bg-gray-100 dark:bg-gray-800 dark:text-gray-200" : ""
                                    }`
                                }
                            >
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span className="mx-4 font-medium"> Add New Slots
                                </span>
                            </NavLink>

                            <NavLink
                                to="/dashboard/add-forum"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${isActive ? "bg-gray-100 dark:bg-gray-800 dark:text-gray-200" : ""
                                    }`
                                }
                            >
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span className="mx-4 font-medium"> Add New Forum</span>
                            </NavLink>


                            <CommonDashboard></CommonDashboard>
                        </nav>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default IsTrainer
