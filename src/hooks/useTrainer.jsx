import React, { useEffect, useState } from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query';

const useTrainer = () => {
    // const [allTrainer, setTrainer] = useState([]);
    // useEffect(() => {
    //     fetch('Trainer.json')
    //         .then(res => res.json())
    //         .then(data => setTrainer(data))
    // }, [])
    // console.log('Total trainer: ', allTrainer.length)
    // return [allTrainer]

    const axiosPublic = useAxiosPublic();
    const { data: allTrainer = [], isPending } = useQuery({
        queryKey: ['allTrainer'],
        queryFn: async () => {
            const result = await axiosPublic.get('/trainer');
            return result.data;
        }
    })
    return [allTrainer, isPending]

}

export default useTrainer
