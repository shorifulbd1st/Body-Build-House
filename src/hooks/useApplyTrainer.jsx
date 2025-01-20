import React from 'react'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query';

const useApplyTrainer = () => {
    const axiosSecure = useAxiosSecure();
    const { data: applyTrainer = [], isPending: applyIsPending, refetch } = useQuery({
        queryKey: ['apply-trainers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/apply-trainers`)
            return res.data;
        }
    })
    return [applyTrainer, applyIsPending, refetch]
}

export default useApplyTrainer
