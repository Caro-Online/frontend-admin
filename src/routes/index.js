import React from 'react';
import { Navigate } from 'react-router-dom';
import { DefaultLayout, DashboardLayout } from 'src/layouts';
import Login from 'src/pages/login';
import NotFound from 'src/pages/not-found';
import Dashboard from 'src/pages/index';
import Users, { UserDetails } from 'src/pages/users';
import Matches, { MatchDetails } from 'src/pages/matches';

const routes = (isLoggedIn) => [
  {
    path: '/',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'matches', element: <Matches /> },
      { path: 'users', element: <Users /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/',
    element: !isLoggedIn ? <DefaultLayout /> : <Navigate to="/dashboard" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '/', element: <Navigate to="/login" /> },
    ],
  },
];

export default routes;
