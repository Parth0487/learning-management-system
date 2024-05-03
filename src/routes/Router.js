import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Assignments = Loadable(lazy(() => import('../views/assignments/assignments')));
const AssignmentDetails = Loadable(lazy(() => import('../views/assignments/AssignmentDetails')));
const CreateAssignment = Loadable(lazy(() => import('../views/assignments/CreateAssignment')));

const Quiz = Loadable(lazy(() => import('../views/quiz/quiz')));
const QuizDetails = Loadable(lazy(() => import('../views/quiz/QuizDetails')));

const Announcement = Loadable(lazy(() => import('../views/announcements/announcments')));
const AnnouncementDetails = Loadable(
  lazy(() => import('../views/announcements/AnnouncementDetails')),
);

const Grades = Loadable(lazy(() => import('../views/grades/grades')));

const Profile = Loadable(lazy(() => import('../views/profile/profile')));

const Courses = Loadable(lazy(() => import('../views/courses/courses')));
const CourseDetails = Loadable(lazy(() => import('../views/courses/CourseDetails')));

const Students = Loadable(lazy(() => import('../views/students/students')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },

      { path: '/assignments', exact: false, element: <Assignments /> },
      { path: '/assignments/view/:id', exact: false, element: <AssignmentDetails /> },
      { path: '/assignments/create', exact: false, element: <CreateAssignment /> },

      { path: '/quiz', exact: false, element: <Quiz /> },
      { path: '/quiz/view/:id', exact: false, element: <QuizDetails /> },

      { path: '/announcements', exact: false, element: <Announcement /> },
      { path: '/announcements/:id', exact: false, element: <AnnouncementDetails /> },

      { path: '/grades', exact: false, element: <Grades /> },

      { path: '/students', exact: false, element: <Students /> },

      { path: '/courses', exact: false, element: <Courses /> },
      { path: '/courses/view/:id', exact: false, element: <CourseDetails /> },

      { path: '/profile', exact: false, element: <Profile /> },

      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
