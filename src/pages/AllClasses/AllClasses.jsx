import React, { useEffect, useState } from 'react'
import SingleClass from './SingleClass';
import useClass from '../../hooks/useClass';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';


const AllClasses = () => {
    const [allClass, isPending, refetch] = useClass();

    if (isPending) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className='w-11/12 mx-auto my-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {
                    allClass.map((item, idx) => <SingleClass key={idx} item={item}></SingleClass>)
                }
            </div>
        </div>
    )
}

export default AllClasses
