import React, { useState } from "react";
import { MdSportsGymnastics } from "react-icons/md";
import useTrainer from "../../hooks/useTrainer";
import { Tooltip } from "react-tooltip";
import { Link, useLocation } from "react-router-dom";
const FSingleClass = ({ item }) => {
    console.log(item)
    const { _id, image, className, classDetails, count } = item || {}
    // const [allTrainer] = useTrainer();
    // const [photo, setPhoto] = useState('');
    // const location = useLocation();
    // const trainer = allTrainer.filter(trainer => {
    //     // console.log(trainer.selectClass)
    //     if (trainer.selectClass) {
    //         return trainer.selectClass.includes(className)
    //     }
    // })
    // console.log('classID: ', _id)

    return (
        <div className="card w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800  border-b-4 border-[#C70039]">

            <img
                className="cursor-pointer object-cover object-center w-full h-56 hover:scale-110 transition  duration-1000 ease-in-out"
                src={image}
                alt={name}
            />

            <div className="flex items-center px-6 py-3 bg-gray-900  ">


                <h1 className=" mx-3 text-xl font-semibold text-white flex justify-center items-center gap-2 -ml-2"><span className="text-2xl font-extrabold"><MdSportsGymnastics /></span> {className}</h1>
            </div>


            <div className="p-3 flex flex-col gap-2 ">
                <div className=" overflow-hidden h-24">
                    <p className="text-justify text-gray-700 dark:text-gray-400 capitalize"><strong>total number of bookings: </strong> {count}</p>
                    <p className="text-justify text-gray-700 dark:text-gray-400 ">{classDetails}</p>
                </div>


                {/* <div className="flex gap-2 flex-wrap mb-2">
                    {trainer &&
                        trainer.slice(0, 5).map((i, idx) => (
                            <Link to={`/trainerDetails/${i._id}`}
                                state={{
                                    from: location, classID: classId
                                }}
                                key={idx}
                                type="button"
                                className="flex items-center focus:outline-none"
                                aria-label="toggle profile dropdown"
                            >
                                <a id={`tooltip-${idx}`}>
                                    <div className="w-16 h-16 overflow-hidden border-2 border-gray-400 rounded-full">
                                        <img
                                            referrerPolicy="no-referrer"
                                            src={i?.photoURL}
                                            className="object-cover w-full h-full"
                                            alt="avatar"
                                        />
                                    </div>
                                </a>
                                <Tooltip anchorSelect={`#tooltip-${idx}`}>
                                    <div className="px-2 py-1 rounded text-sm" referrerPolicy="no-referrer">
                                        {i?.name}
                                    </div>
                                </Tooltip>
                            </Link>
                        ))}
                </div> */}

            </div>
        </div >

    );
};

export default FSingleClass;
