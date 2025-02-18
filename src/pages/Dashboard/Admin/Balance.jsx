// import React, { useEffect } from 'react'
// import useAdmin from '../../../hooks/useAdmin'
// import { use } from 'react';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

// import React, { PureComponent } from 'react';
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';




// const Balance = () => {
//     // static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

//     const [isAdmin, isAdminLoading] = useAdmin();
//     const axiosSecure = useAxiosSecure();

//     const { data, isPending } = useQuery({
//         queryKey: ['payment'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/payment');
//             return res.data
//         }
//     })
//     const { data: subscribe = [], isPending1} = useQuery({
//         queryKey: ['subscribe'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/subscribe');
//             return res.data;
//         }
//     })

//     if (isPending || isAdminLoading || isPending1) {
//         <LoadingSpinner></LoadingSpinner>
//     }

//     return (

//         <div className='w-11/12 mx-auto my-5'>

//             <ResponsiveContainer width="100%" height="100%">
//                 <PieChart width={400} height={400}>
//                     <Pie
//                         data={data.result}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={renderCustomizedLabel}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                     >
//                         {data.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                     </Pie>
//                 </PieChart>
//             </ResponsiveContainer>
//         </div>
//     )
// }

// export default Balance
import React from 'react';
import useAdmin from '../../../hooks/useAdmin';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#FF8042']; // PieChart এর রঙ

const Balance = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const axiosSecure = useAxiosSecure();

    // Fetch payment data
    const { data: paymentData = {}, isLoading: isPaymentLoading } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payment');
            return res.data;
        }
    });

    // Fetch subscription data
    const { data: subscribeData = [], isLoading: isSubscribeLoading } = useQuery({
        queryKey: ['subscribe'],
        queryFn: async () => {
            const res = await axiosSecure.get('/subscribe');
            return res.data;
        }
    });

    // Show loading spinner if any data is still loading
    if (isPaymentLoading || isAdminLoading || isSubscribeLoading) {
        return <LoadingSpinner />;
    }

    // Prepare data for PieChart
    const pieChartData = [
        { name: 'Payments', value: paymentData.result?.length || 0 },
        { name: 'Subscriptions', value: subscribeData.length || 0 }
    ];

    return (
        <div className='w-11/12 mx-auto my-5'>
            <div className='flex justify-center items-center gap-2'>
                <div className='w-1/2'>
                    <h1 className='text-xl'><strong>Total Balance : </strong>${paymentData?.result1[0]?.totalPrice} </h1>
                </div>
                <div className='w-1/2'>
                    <h2 className="text-center text-xl font-bold mb-4">Balance Summary</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}`}
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>
            <div>
                <section class="container px-4 mx-auto ">
                    <div class="flex items-center gap-x-3">
                        <h2 class="text-lg font-medium text-gray-800 dark:text-white">Latest Transaction</h2>
                        {/* <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{subscribe.length} users</span> */}
                    </div>
                    <div class="flex flex-col mt-6">
                        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead class="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <div class="flex items-center gap-x-3">
                                                        <input type="checkbox" class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                                        <span>Trainer Name</span>
                                                    </div>
                                                </th>
                                                <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <div class="flex items-center gap-x-3">
                                                        <input type="checkbox" class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                                        <span>User Name</span>
                                                    </div>
                                                </th>
                                                <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <div class="flex items-center gap-x-3">
                                                        <input type="checkbox" class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                                        <span>Price </span>
                                                    </div>
                                                </th>
                                                <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <div class="flex items-center gap-x-3">
                                                        <input type="checkbox" class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                                        <span>Package Type </span>
                                                    </div>
                                                </th>
                                                {/* <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email address</th> */}
                                                {/* <th scope="col" class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button class="flex items-center gap-x-2">
                                                    <span>Status</span>

                                                    <svg class="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                        <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                        <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                                    </svg>
                                                </button>
                                            </th> */}
                                                <th scope="col" class="relative py-3.5 px-4">
                                                    <span class="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                            {
                                                paymentData?.result.map((member, idx) => (
                                                    <tr key={idx}>
                                                        <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                            <div class="inline-flex items-center gap-x-3">
                                                                {/* <input type="checkbox" class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" /> */}

                                                                <div class="flex items-center gap-x-2">
                                                                    <div>
                                                                        <h2 class="font-medium text-gray-800 dark:text-white">{member.trainerName}</h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{member.userName}</td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">${member.price}</td>
                                                        <td className={`px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap ${member.package}`}>{member.package}</td>

                                                    </tr>
                                                ))
                                            }
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Balance;
