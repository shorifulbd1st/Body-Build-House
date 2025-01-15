import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ErrorPage from "../components/Shared/ErrorPage";
import Home from "../pages/Home/Home";
import AllTrainer from "../pages/AllTrainer/AllTrainer";
import AllClasses from "../pages/AllClasses/AllClasses";
import UserProfile from "../pages/UserProfile/UserProfile";
import Community from "../pages/Community/Community";
import SignIn from "../pages/Authentication/SignIn";
import Register from "../pages/Authentication/Register";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <SignIn></SignIn>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/all-trainer',
                element: <AllTrainer></AllTrainer>
            },
            {
                path: '/all-classes',
                element: <AllClasses></AllClasses>
            },
            {
                path: '/community',
                element: <Community></Community>
            },
            {
                path: '/user-profile',
                element: <UserProfile></UserProfile>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>
    }
])

export default router;