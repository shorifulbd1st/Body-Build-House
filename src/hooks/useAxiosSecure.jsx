import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'https://body-build-house-server.vercel.app'
    // baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { user, handleLogout } = useContext(AuthContext);

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error)
    });
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            await handleLogout('e');
            navigate('/login')
        }
        return Promise.reject(error)
    })
    return axiosSecure;

}

export default useAxiosSecure
