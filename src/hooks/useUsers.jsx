import React from 'react'
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
    const axiosPublic = useAxiosPublic();
    const { data: users = [], isPending } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const result = await axiosPublic.get('/users');
            return result.data;
        }
    })
    return [users, isPending]
}

export default useUsers
