import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddNewClass = () => {
    const [file, setFile] = useState(null);
    const axiosSecure = useAxiosSecure();
    const { user, loading, notify } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        // console.log(selectedFile)
        setFile(selectedFile);
    };
    // console.log(file)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const className = form.get('className')
        const classDetails = form.get('classDetails');

        const imageFile = { image: file }
        // console.log(imageFile)
        const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
                'content-Type': 'multipart/form-data'
            }
        });
        // console.log(res.data)
        if (res.data.success) {
            const classInfo = {
                className,
                image: res.data.data.display_url,
                classDetails,
                count: 0,
            }
            const newClass = await axiosSecure.post('/class', classInfo);
            // console.log(menuRes.data.insertedId)
            if (newClass.data.insertedId) {
                notify('success', 'add new class successful')
                navigate('/all-classes')
            }
        }


    };

    return (
        <section className="max-w-4xl p-6 border-2 border-blue-500 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 className="text-xl underline decoration-red-600 font-semibold text-gray-700 capitalize dark:text-white text-center">
                Add New Class
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-700 text-lg font-medium dark:text-gray-200">
                            Class Name
                        </label>
                        <input
                            id="className"
                            type="text"
                            name="className"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-lg font-medium text-gray-500 dark:text-gray-300">
                            Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name='image'
                            onChange={handleFileChange}
                            className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                        />
                    </div>
                    <div className="mb-4 col-span-2">
                        <label className="block text-lg font-medium text-gray-700">
                            Details
                        </label>
                        <textarea
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            rows="4"
                            name="classDetails"
                        ></textarea>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AddNewClass;
