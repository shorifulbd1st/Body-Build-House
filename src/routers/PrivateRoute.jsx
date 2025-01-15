import React, { useContext } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import LoadingSpinner from '../components/Shared/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(loading)
    if (loading)
        return <LoadingSpinner></LoadingSpinner>
    if (user)
        return children
    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>
}

export default PrivateRoute
