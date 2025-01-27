import { useContext, useEffect, useState } from "react";
import Select from "react-select/base";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { colourOptions } from "../../../../public/customColor";
import Select1 from 'react-select';
import { label } from "motion/react-client";
import { useNavigate } from "react-router-dom";
const options = [
    { value: 'morning', label: 'morning' },
    { value: 'afternoon', label: 'afternoon' },
    { value: 'evening', label: 'evening' },
];

// const addClass = [
//     { value: 'Hllt Blast', label: 'Hllt Blast' },
//     { value: 'Spin Cycle', label: 'Spin Cycle' },
//     { value: 'Yoga Flow', label: 'Yoga Flow' },
//     { value: 'Pilates Core', label: 'Pilates Core' },
//     { value: 'Cardio Kickboxing', label: 'Cardio Kickboxing' },
// ]
const AddNewSlots = () => {
    const { user, loading, notify } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const axiosSecure = useAxiosSecure();
    // const [selectedDays, setSelectedDays] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const navigate = useNavigate()
    const customStyles = {
        control: (provided) => ({
            ...provided,
            cursor: 'pointer',
        }),
        option: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
        }),
        multiValue: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
        }),
        multiValueLabel: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
        }),
        multiValueRemove: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
        }),
    };

    useEffect(() => {
        const userFun = async () => {
            const { data } = await axiosSecure.get(`/trainer-email/${user?.email}`);
            setUserData(data);
        }
        userFun();
    }, [user?.email, axiosSecure]);

    if (loading || !userData) {
        return <LoadingSpinner />;
    }
    // console.log(userData)
    // const daysD = [];
    const { name, email, photoURL, age, experience, availableTime, biography, skill: skills, availableDays, status } = userData;
    // console.log(availableDays)
    // const addClass = [
    //     { value: 'Hllt Blast', label: 'Hllt Blast' },
    //     { value: 'Spin Cycle', label: 'Spin Cycle' },
    //     { value: 'Yoga Flow', label: 'Yoga Flow' },
    //     { value: 'Pilates Core', label: 'Pilates Core' },
    //     { value: 'Cardio Kickboxing', label: 'Cardio Kickboxing' },
    // ]

    const addClass = [];
    skills?.map(checkbox => {
        addClass.push({ value: checkbox, label: checkbox });
    });
    // console.log(skills)

    const [selectedDays, setSelectedDays] = useState([]);
    useEffect(() => {
        const days = colourOptions.filter((option) => availableDays?.includes(option.value))
        // console.log(days)
        setSelectedDays(days)


    }, [userData])
    // console.log(addClass)

    const handleSubmitData = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        // console.log(selectedClass)
        // console.log(selectedOption)

        // const name = form.get('name');
        // const email = form.get('email');
        // const photoURL = form.get('photo');
        // const age = form.get('age');
        // const experience = form.get('experience');
        // const availableTime = form.get('availableTime');
        // const biography = form.get('biography');
        const slotTime = parseInt(form.get('slotTime'));
        if (slotTime > availableTime) {
            notify('error', 'Your available time is grater than slot Time. You cannot book any more slots.')
            navigate('/')
        }
        // console.log(slotTime)

        // const skill = [];
        // const skillCheckboxes = document.querySelectorAll('input[name="skill"]:checked');
        // skillCheckboxes.forEach(checkbox => {
        //     skill.push(checkbox.value);
        // });

        else {
            const selectClass = selectedClass.value;
            const slotName = selectedOption.value;
            // console.log(selectClass)
            // console.log(slotName)
            // const userInfo = {
            //     name, email, photoURL, age, experience, availableTime, biography, skill, availableDays, status: 'pending'
            // };
            // console.log(userInfo)
            const Info = { email, selectClass, slotName, slotTime }
            // console.log(Info)
            const res = axiosSecure.patch('/add-slot', Info);
            // console.log("Server Response:", res);
            // if (res.data.modifiedCount) {
            navigate('/dashboard/manage-slot')
            // }
        }

        // if (res.data.insertedId) {
        //     notify('success', 'Your registration successful');
        //     e.target.reset();
        // }
    };

    return (
        <div className='w-11/12 mx-auto my-5 border-2 border-blue-500 rounded-xl'>
            <div className=" p-4 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4  text-center capitalize">Add slot </h1>

                <form onSubmit={handleSubmitData}>
                    <div className='flex gap-2'>
                        <div className="flex-1 mb-4">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                defaultValue={email}
                                readOnly
                                name='email'
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-4 flex-1">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                defaultValue={name}
                                readOnly
                                name='name'
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Photo URL</label>
                        <input
                            type="url"
                            defaultValue={photoURL}
                            readOnly
                            name='photo'
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className='flex gap-2'>
                        <div className="mb-4 flex-1">
                            <label className="block text-sm font-medium text-gray-700">Age</label>
                            <input
                                type="number"
                                name='age'
                                defaultValue={age}
                                readOnly
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-4 flex-1">
                            <label className="block text-sm font-medium text-gray-700">Experience (Year)</label>
                            <input
                                type="number"
                                name='experience'
                                defaultValue={experience}
                                readOnly
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Skills</label>
                        <div className="px-3 my-2 flex gap-4 items-center flex-wrap">
                            {[
                                "HllT Blast", "Yoga Flow", "Pilates Core", "Cardio kickboxing",
                                "Zumba Dance", "Spin Cycle", "Barre Fitness", "Meditation",
                                "CrossFit Fundamentals", "Powerfitting Basics", "Core Blast", "Body Combat",
                                "Strength Training", "Functional Fitness", "Tabata Intervals", "Kettlebell",
                                "Stretching", "Mindful Breathing Techniques", "Boxing Fundamentals",
                                "Dance Cardio", "Agility and Speed Training", "Injury Prevention and Recovery"
                            ].map((skill, index) => (
                                <div key={index} className="flex items-center justify-center flex-wrap">
                                    <input
                                        type="checkbox"
                                        id={`skill-${index}`}
                                        value={skill}
                                        checked={skills?.includes(skill)}
                                        readOnly
                                        name='skill'
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor={`skill-${index}`} className="ml-1 block text-sm text-gray-900">
                                        {skill}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4 ">
                        <label className="block text-sm font-medium text-gray-700">Select Available Days</label>
                        <Select
                            className="mt-1 block w-full text-xl rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            closeMenuOnSelect={false}
                            isMulti
                            options={colourOptions}
                            styles={customStyles}
                            name="availableDays"
                            value={selectedDays}
                            onChange={(selected) => setSelectedDays(selected)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Available Time</label>
                        <input
                            type="number"
                            name='availableTime'
                            defaultValue={availableTime}
                            readOnly
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Biography</label>
                        <textarea
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            rows="4"
                            name='biography'
                            defaultValue={biography}
                            readOnly
                        ></textarea>
                    </div>
                    <div><p className='border-b-2  border-red-600 my-5'></p></div>

                    <div>
                        <div className="flex gap-2">
                            <div className="mb-4 flex-1 ">
                                <label className="block text-sm font-medium text-gray-700">Select Available slot</label>
                                <Select1
                                    className="mt-1 block w-full text-xl rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    options={options}
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}

                                />
                            </div>
                            <div className="mb-4 flex-1">
                                <label className="block text-sm font-medium text-gray-700">Slot Time</label>
                                <input
                                    type="number"
                                    name='slotTime'

                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>
                        <div className="mb-4 flex-1 ">
                            <label className="block text-sm font-medium text-gray-700">Select class</label>
                            <Select1
                                className="mt-1 block w-full text-xl rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                options={addClass}
                                defaultValue={selectedClass}
                                onChange={setSelectedClass}

                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNewSlots;