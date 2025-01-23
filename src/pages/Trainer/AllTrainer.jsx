import React, { useEffect, useState } from 'react'
import Card from '../../components/Shared/Card'
import useTrainer from '../../hooks/useTrainer'
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import Trainer from './Trainer';

const AllTrainer = () => {
    const [allTrainer, isPending] = useTrainer();
    if (isPending) {
        <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className='w-11/12 mx-auto my-5'>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
                {
                    allTrainer.map(trainer => <Trainer key={trainer._id} trainer={trainer}></Trainer>)
                }
            </div>
        </div>
    )

}

export default AllTrainer
