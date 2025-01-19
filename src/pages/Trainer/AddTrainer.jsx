import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { colourOptions } from '../../../public/customColor';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const AddTrainer = () => {
    const { user, loading, notify } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [selectedDays, setSelectedDays] = useState([]);

    useEffect(() => {
        const userFun = async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`);
            setUserData(data);
        }
        userFun();
    }, [user?.email]);

    if (loading || !userData) {
        return <LoadingSpinner />;
    }

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

    const handleSubmitData = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);

        const name = form.get('name');
        const email = form.get('email');
        const photo = form.get('photo');
        const age = form.get('age');
        const experience = form.get('experience');
        const availableTime = form.get('availableTime');
        const biography = form.get('biography');

        const skills = [];
        const skillCheckboxes = document.querySelectorAll('input[name="skill"]:checked');
        skillCheckboxes.forEach(checkbox => {
            skills.push(checkbox.value);
        });

        const availableDays = selectedDays.map(day => day.value);

        const userInfo = {
            name, email, photo, age, experience, availableTime, biography, skills, availableDays, status: 'pending'
        };
        console.log(userInfo)
        const res = await axiosSecure.post('/trainer-register', userInfo);
        console.log("Server Response:", res);

        if (res.data.insertedId) {
            notify('success', 'Your registration successful');
            e.target.reset();
        }
    };

    return (
        <div className='w-11/12 mx-auto my-5 border-2 border-blue-500 rounded-xl'>
            <div className=" p-4 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4  text-center capitalize">Trainer registration form </h1>

                <form onSubmit={handleSubmitData}>
                    <div className='flex gap-2'>
                        <div className="flex-1 mb-4">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                defaultValue={userData.email}
                                readOnly
                                name='email'
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-4 flex-1">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                defaultValue={userData.name}
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
                            defaultValue={userData.photo}
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-4 flex-1">
                            <label className="block text-sm font-medium text-gray-700">Experience (Year)</label>
                            <input
                                type="number"
                                name='experience'
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Biography</label>
                        <textarea
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            rows="4"
                            name='biography'
                        ></textarea>
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

export default AddTrainer;