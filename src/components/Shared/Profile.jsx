import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from './LoadingSpinner';
const Profile = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: userData = {}, isPending } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user?.email}`)
            return res.data;
        }
    })
    if (isPending || loading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    // console.log(userData)
    return (
        // <div className='w-11/12 mx-auto flex justify-center items-center my-8'>
        //     <div className=" w-full lg:max-w-2xl overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        //         <div className='h-96 w-96 flex justify-center items-center text-center'>
        //             <img
        //                 className="object-cover w-full h-full"
        //                 src={userData.photo} alt="avatar"
        //             />
        //         </div>
        //         <div className="py-5 text-center">

        //             <a
        //                 href="#"
        //                 className="block text-xl font-bold text-gray-800 dark:text-white"
        //                 tabIndex="0"
        //                 role="link"
        //             >
        //                 {userData.name}
        //             </a>
        //             <p><strong>Email : </strong> {userData.email} </p>
        //             <p><strong>Role : </strong> {userData.role} </p>
        //         </div>
        //     </div>
        // </div>
        <div className="w-11/12 mx-auto flex justify-center items-center my-8 ">
            <div className="w-full lg:max-w-2xl overflow-hidden bg-white rounded-lg border border-red-600 shadow-lg dark:bg-gray-800">
                <div className="flex justify-center items-center p-5">
                    <div className="h-48 w-48 sm:h-64 sm:w-64 lg:h-96 lg:w-96">
                        <img
                            className="object-cover w-full h-full rounded-full border-2 border-gray-300"
                            src={userData.photo}
                            alt="avatar"
                        />
                    </div>
                </div>
                <div className="py-5 text-center">
                    <a
                        href="#"
                        className="block text-xl font-bold text-gray-800 dark:text-white"
                        tabIndex="0"
                        role="link"
                    >
                        {userData.name}
                    </a>
                    <p>
                        <strong>Email: </strong> {userData.email}
                    </p>
                    <p>
                        <strong>Role: </strong> {userData.role}
                    </p>

                </div>
            </div>
        </div>

    )
}

export default Profile
