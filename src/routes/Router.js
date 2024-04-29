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

      { path: '/announcement', exact: false, element: <Announcement /> },
      { path: '/announcement/:id', exact: false, element: <AnnouncementDetails /> },

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
