import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../components/Shared/LoadingSpinner';

const useClass = () => {
    const axiosPublic = useAxiosPublic();
    const { data: allClass = [], isPending, refetch } = useQuery({
        queryKey: ['class'],
        queryFn: async () => {
            const result = await axiosPublic.get('/class');

            return result.data;
        }
    })

    return [allClass, isPending, refetch]
}

export default useClass
