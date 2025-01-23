import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import Select1 from 'react-select';
const CheckoutForm = ({ trainer, userData, i, p, taka, classID, skills }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [customError, setCustomError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('')

    const { user, notify } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    const [classData, setClassData] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);

    const addClass = [];
    skills?.map(checkbox => {
        addClass.push({ value: checkbox, label: checkbox });
    });
    console.log(classID)
    useEffect(() => {
        if (classID) {
            axiosSecure.get(`/class/${classID}`)
                .then(res => {
                    setClassData(res.data)
                })
        }
        else {
            setClassData(null)
        }
    }, [classID])
    console.log('classData', classData)

    useEffect(() => {
        if (taka > 0) {
            axiosSecure.post('/create-payment-intent', { price: taka })
                .then(res => {
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, taka])

    // console.log(trainer, userData, i, p)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card === null) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setCustomError(error.message)
        } else {
            setCustomError('')
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.name || 'anonymous'
                }
            }
        })
        if (confirmError) {
            // console.log('confirmError', confirmError)
        }
        else {
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id);
                const payment = {
                    trainerName: trainer.name,
                    userName: userData.name,
                    TrainerEmail: trainer.email,
                    userEmail: userData.email,
                    price: taka,
                    transactionId: paymentIntent.id,
                    package: p,
                    selectedSlot: i,
                }
                const res = await axiosSecure.post('/payment', payment)

                // console.log(classID)
                let id = '';
                if (classID) {
                    id = classID
                } else {
                    const res = await axiosSecure.get(`/class-name/${selectedClass.value}`)
                    id = res.data._id;
                }

                if (res.data.insertedId) {
                    notify('success', 'Your payment successful')
                    const res1 = await axiosSecure.patch(`/class-update/${id}`)
                    // console.log(res1)
                    navigate('/')
                }

            }
        }

    }


    return (
        <div className=' w-full'>

            <form onSubmit={handleSubmit}>
                <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                    {
                        !classData && <div className="mb-4 flex-1 ">
                            <label className="block text-sm font-medium text-gray-700">Select class</label>
                            <Select1
                                className="mt-1 block w-full text-xl rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                options={addClass}
                                defaultValue={selectedClass}
                                onChange={setSelectedClass}

                            />
                        </div>
                    }
                    <div className="mb-4">
                        <label htmlFor="card-element" className="block text-gray-700 text-sm font-bold mb-2">
                            Card Details
                        </label>
                        <div className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: 'gray',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Pay Now
                    </button>
                </div>
                {/* {customError} <p className='text-red-500 font-semibold'>{customError}</p>
                {transactionId && <p className='text-green-500 font-semibold'>{transactionId}</p>} */}
            </form>
        </div>
    )
}

export default CheckoutForm
