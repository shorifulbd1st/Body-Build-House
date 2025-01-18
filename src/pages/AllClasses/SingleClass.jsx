import React, { useState } from "react";
import { MdSportsGymnastics } from "react-icons/md";
import useTrainer from "../../hooks/useTrainer";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
const SingleClass = ({ item }) => {
    const { image, className, classDetails } = item
    const [allTrainer] = useTrainer();
    const [photo, setPhoto] = useState('');
    const trainer = allTrainer.filter(trainer => trainer.selectClass.includes(className))

    return (
        <div className="card w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800  border-b-4 border-blue-500">

            <img
                className="cursor-pointer object-cover object-center w-full h-56 hover:scale-110 transition  duration-1000 ease-in-out"
                src={image}
                alt={name}
            />

            <div className="flex items-center px-6 py-3 bg-gray-900  ">
                {/* <svg
                    aria-label="headphones icon"
                    className="w-6 h-6 text-white fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17 21C15.8954 21 15 20.1046 15 19V15C15 13.8954 15.8954 13 17 13H19V12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12V13H7C8.10457 13 9 13.8954 9 15V19C9 20.1046 8.10457 21 7 21H3V12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V21H17ZM19 15H17V19H19V15ZM7 15H5V19H7V15Z"
                    />
                </svg> */}

                <h1 className=" mx-3 text-xl font-semibold text-white flex justify-center items-center gap-2 -ml-2"><span className="text-2xl font-extrabold"><MdSportsGymnastics /></span> {className}</h1>
            </div>


            <div className="p-2 flex flex-col gap-2">
                <div className=" overflow-hidden h-24">
                    <p className="text-justify text-gray-700 dark:text-gray-400 ">{classDetails}</p>
                </div>


                <div className="flex gap-2 flex-wrap mb-2">
                    {trainer &&
                        trainer.slice(0, 5).map((i, idx) => (
                            <Link to={`/trainerDetails/${i._id}`}
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
                </div>

            </div>
        </div>
    );
};

export default SingleClass;
// import React, { useState } from "react";
// import { MdSportsGymnastics } from "react-icons/md";
// import useTrainer from "../../hooks/useTrainer";
// import { Tooltip } from "react-tooltip";

// const SingleClass = ({ item }) => {
//     const { image, className, classDetails } = item;
//     const [allTrainer] = useTrainer();
//     const [photo, setPhoto] = useState("");
//     const trainer = allTrainer.filter((trainer) =>
//         trainer.selectClass.includes(className)
//     );

//     return (
//         <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 flex flex-col h-[470px] pb-2">
//             {/* Image Section */}
//             <img
//                 className="cursor-pointer object-cover object-center w-full h-56 hover:scale-110 transition"
//                 src={image}
//                 alt={className}
//             />

//             {/* Class Name Section */}
//             <div className="flex items-center px-6 py-3 bg-gray-900">
//                 <h1 className="mx-3 text-xl font-semibold text-white flex justify-center items-center gap-2 -ml-2">
//                     <span className="text-2xl font-extrabold">
//                         <MdSportsGymnastics />
//                     </span>{" "}
//                     {className}
//                 </h1>
//             </div>

//             {/* Class Details and Trainer Section */}
//             <div className="p-2 flex flex-col flex-grow">
//                 {/* Class Details */}
//                 <p className="py-2 text-justify text-gray-700 dark:text-gray-400 flex-grow">
//                     {classDetails}
//                 </p>

//                 {/* Trainer Avatars */}
//                 <div className="flex gap-2 flex-wrap ">
//                     {trainer &&
//                         trainer.map((i, idx) => (
//                             <button
//                                 key={idx}
//                                 type="button"
//                                 className="flex items-center focus:outline-none"
//                                 aria-label="toggle profile dropdown"
//                             >
//                                 <a id={`tooltip-${idx}`}>
//                                     <div className="w-16 h-16 overflow-hidden border-2 border-gray-400 rounded-full">
//                                         <img
//                                             referrerPolicy="no-referrer"
//                                             src={i?.photoURL}
//                                             className="object-cover w-full h-full"
//                                             alt="avatar"
//                                         />
//                                     </div>
//                                 </a>
//                                 <Tooltip anchorSelect={`#tooltip-${idx}`}>
//                                     <div
//                                         className="px-2 py-1 rounded text-sm"
//                                         referrerPolicy="no-referrer"
//                                     >
//                                         {i?.name}
//                                     </div>
//                                 </Tooltip>
//                             </button>
//                         ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SingleClass;