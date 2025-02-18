import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ErrorPage from "../components/Shared/ErrorPage";
import Home from "../pages/Home/Home";
import AllClasses from "../pages/AllClasses/AllClasses";
import UserProfile from "../pages/UserProfile/UserProfile";
import Community from "../pages/Community/Community";
import SignIn from "../pages/Authentication/SignIn";
import Register from "../pages/Authentication/Register";
import PrivateRoute from "./PrivateRoute";
import AllTrainer from "../pages/Trainer/AllTrainer";
import AddTrainer from "../pages/Trainer/AddTrainer";
import TrainerDetails from "../pages/Trainer/TrainerDetails";
import TrainerBooking from "../pages/Trainer/TrainerBooking";
import Payment from "../pages/Payment/Payment";
import ApplyTrainer from "../pages/Trainer/ApplyTrainer";
import AdminRoute from "./AdminRoute";
import ApplyTrainerDetails from "../pages/Trainer/ApplyTrainerDetails";
import AddSlot from "../pages/Trainer/Addslot ";
import AddNewSlots from "../pages/Dashboard/Trainer/AddNewSlots";
import AllTrainers from "../pages/Dashboard/Admin/AllTrainers";
import Balance from "../pages/Dashboard/Admin/Balance";
import AddNewClass from "../pages/Dashboard/Admin/AddNewClass";
import AddNewForum from "../components/Shared/AddNewForum";
import Subscribers from "../pages/Dashboard/Admin/Subscribers";
import ForumDetails from "../pages/Community/ForumDetails";
import BookedTrainer from "../components/Shared/BookedTrainer";
import ActivityLog from "../pages/Dashboard/Member/ActivityLog";
import Profile from "../components/Shared/Profile";
import ManageSlot from "../pages/Dashboard/Trainer/ManageSlot";
import ProfilePage from "../pages/Dashboard/Member/ProfilePage";
import ClassDetails from "../components/Shared/ClassDetails";

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
                path: '/trainerDetails/:id',
                element: <TrainerDetails></TrainerDetails>
            },
            {
                path: '/trainer-booking/:i/:id',
                element: <TrainerBooking></TrainerBooking>
            },
            {
                path: '/all-classes',
                element: <AllClasses></AllClasses>
            },
            {
                path: '/class-details/:id',
                element: <ClassDetails></ClassDetails>
            },
            {
                path: '/community',
                element: <Community></Community>
            },
            {
                path: '/forumDetails/:id',
                element: <ForumDetails></ForumDetails>

            },
            {
                path: '/user-profile',
                element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>
            },
            {
                path: '/payment/:p/:i/:id',
                element: <Payment></Payment>
            },
            {
                path: '/addTrainer',
                element: <PrivateRoute> <AddTrainer></AddTrainer></PrivateRoute>
            },
            {
                path: '/profile',
                element: <Profile></Profile>

            }

        ]
    },
    {
        path: 'dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: 'subscribe',
                element: <Subscribers></Subscribers>
            },
            // {
            //     path: 'addTrainer',
            //     element: <PrivateRoute> <AddTrainer></AddTrainer></PrivateRoute>
            // },
            {
                path: 'apply-trainer',
                element: <AdminRoute> <ApplyTrainer></ApplyTrainer></AdminRoute>
            },
            {
                path: 'apply-trainer-details/:id',
                element: <ApplyTrainerDetails></ApplyTrainerDetails>
            },
            {
                path: 'add-slot',
                element: <AddNewSlots></AddNewSlots>
            },
            {
                path: 'all-trainer',
                element: <AllTrainers></AllTrainers>
            },
            {
                path: 'balance',
                element: <Balance></Balance>
            },
            {
                path: 'add-class',
                element: <AdminRoute><AddNewClass></AddNewClass></AdminRoute>
            },
            {
                path: 'add-forum',
                element: <AddNewForum></AddNewForum>
            },
            {
                path: 'booked-trainer',
                element: <BookedTrainer></BookedTrainer>
            },
            {
                path: 'activity-log',
                element: <ActivityLog></ActivityLog>
            },
            // {
            //     path: 'profile',
            //     element: <Profile></Profile>
            // },
            {
                path: 'manage-slot',
                element: <ManageSlot></ManageSlot>
            },
            {
                path: 'user-profile',
                element: <PrivateRoute><ProfilePage></ProfilePage></PrivateRoute>
            }
        ]
    }

])

export default router;