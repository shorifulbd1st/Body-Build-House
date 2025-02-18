import React, { useContext } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const ProfilePage = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: userData = {}, isPending } = useQuery({
        queryKey: ['user-profile'],
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
        <div className='w-11/12 mx-auto my-8'>
            <div className="w-full max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <img
                    className="object-cover w-full"
                    src={userData.photo} alt="avatar"
                />
                <div className="py-5 text-center">

                    <a
                        href="#"
                        className="block text-xl font-bold text-gray-800 dark:text-white"
                        tabIndex="0"
                        role="link"
                    >
                        {userData.name}
                    </a>
                    <p><strong>Email : </strong> {userData.email} </p>
                    <p><strong>Role : </strong> {userData.role} </p>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
