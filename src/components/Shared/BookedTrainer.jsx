import React, { useContext } from 'react'
import useTrainer from '../../hooks/useTrainer'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../providers/AuthProvider';
import LoadingSpinner from './LoadingSpinner';
import TrainerBooking from '../../pages/Trainer/TrainerBooking';
import { div, h1 } from 'motion/react-client';
import TrainerProfile from '../../pages/Dashboard/Member/TrainerProfile';

const BookedTrainer = () => {
    const [allTrainer, isPending] = useTrainer();
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useContext(AuthContext);

    const { data: trainerData = [], isPending1 } = useQuery({
        queryKey: ['trainer-book'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user?.email}`)
            return res.data;
        }
    })
    if (isPending || loading || isPending1) {
        return <LoadingSpinner></LoadingSpinner>
    }
    // console.log(allTrainer)
    // console.log(trainerData)
    const newTrainer = [...allTrainer];
    // console.log('newTrainer', newTrainer)
    const emails = trainerData.map(trainer => trainer.TrainerEmail)
    // console.log(emails)
    const bookTrainer = newTrainer?.filter(trainer =>
        // console.log(trainer)
        emails?.includes(trainer.email)
    );

    // console.log(bookTrainer);

    return (
        <div className='w-11/12 mx-auto my-5'>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 '>
                {
                    bookTrainer.length > 0 ? bookTrainer.map((trainer, idx) => <TrainerProfile key={idx} trainer={trainer}></TrainerProfile>) : <h1 className='text-2xl font-bold text-red-500'>You haven't booked any trainers yet.</h1>
                }
            </div>
        </div>
    )
}

export default BookedTrainer
