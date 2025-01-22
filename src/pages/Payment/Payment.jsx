import React, { useContext, useEffect, useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useElements, useStripe } from '@stripe/react-stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);


const Payment = () => {

    const { p, i, id } = useParams();
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [trainer, setTrainer] = useState(null);
    const [userData, setUserData] = useState(null);
    const location = useLocation()
    const from = location.state || { from: { pathname: "/" } };

    const classId = from.from?.classID || ''



    useEffect(() => {
        const trainerFun = async () => {
            const { data } = await axiosSecure.get(`/trainer/${id}`);
            setTrainer(data);
        }
        trainerFun();
    }, [id, axiosSecure]);

    useEffect(() => {
        const userFun = async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`);
            setUserData(data);
        }
        userFun();
    }, [user?.email, axiosSecure]);

    if (loading || !trainer || !userData) {
        return <LoadingSpinner />;
    }

    // console.log(p, i, id);
    // console.log(trainer);
    // console.log(userData);
    const { _id, photoURL, name, age, experience, skill, availableDays, availableTime, biography, slotName, slotTime, selectClass, socialMedia } = trainer;
    // console.log(skill)
    let taka = 100;
    if (p === 'basic') taka = 10;
    else if (p === 'standard') taka = 50;

    return (
        <div className='w-11/12 mx-auto my-5'>
            <h1 className='text-center text-xl font-semibold italic'>Payment Page</h1>
            <div className='w-full flex flex-col justify-center items-center'>
                <div className="card w-[45%] border border-red-500 overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800 border-b-4 " >
                    <div className="flex justify-between items-center px-6 py-3 bg-gray-900 text-white ">
                        <div>
                            <p><strong>Trainer Name : </strong> <span className='text-lg'>{name}</span> </p>
                            <p className='capitalize'><strong>Selected slot : </strong> <span className='text-lg '>{i}</span> </p>
                        </div>
                        <div>
                            <p className='capitalize'><strong>Package name: </strong> <span className='text-lg '>{p}</span> </p>
                            <p className='capitalize'><strong>Price : </strong> $<span className='text-lg '>
                            </span>{taka} </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center  gap-3 w-full  px-6 py-3 ">
                        <div className=''>
                            <p><strong>Your Name: </strong> {userData.name} </p>
                            <p><strong>Your Email: </strong> {userData.email} </p>
                        </div>
                        <div className='w-full'>
                            <Elements stripe={stripePromise}>
                                <CheckoutForm trainer={trainer} userData={userData} p={p} i={i} taka={taka} classID={classId} skills={skill}></CheckoutForm>
                            </Elements>
                        </div>
                    </div>
                    {/* <div className='my-4 text-center flex justify-center items-end'>
                        <Link to={`/trainerDetails/${_id}`}
                            className="hover:scale-110 transition duration-1000 ease-in-out  p-2 text-md font-semibold text-white uppercase  transform bg-gray-800 rounded  dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                        >
                            pay button
                        </Link>
                    </div> */}
                </div>

            </div>



        </div>
    )
}

export default Payment
