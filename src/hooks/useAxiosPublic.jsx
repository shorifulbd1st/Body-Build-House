import axios from 'axios'
import React from 'react'

const axiosPublic = axios.create({
    baseURL: 'https://body-build-house-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic
}

export default useAxiosPublic
