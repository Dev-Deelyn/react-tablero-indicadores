import { useContext, useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

import Base from 'containers/base';
import UserList from 'containers/user/UsersList';
import DashboardList from 'containers/board/DashboardList';
import Indexer from 'containers/common/Indexer';
import LoginPage from 'containers/user/LoginPage';

import { buildRoutesFromDashboards, buildIndexerRoutes } from './dynamicRoutes';
import { getAllDashboards } from 'services/DashboardServices';
import Dashboard from 'types/Dashboard';

const AppRouter = () => {
  const { profileType, accessSections } = useContext(AuthContext);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);

  useEffect(() => {
    getAllDashboards().then(res => {
      setDashboards(res.data ?? []);
    });
  }, []);

  const dynamicRoutes = buildRoutesFromDashboards(dashboards, accessSections);
  const indexerRoutes = buildIndexerRoutes(dashboards);

  const routes = [
    {
      path: '/',
      element: <Base />,
      children: [
        { index: true, element: <Navigate to="/main" /> },
        {
          path: 'main',
          element: <Indexer main title="indicadores provinciales" routes={indexerRoutes} />
        },
        ...dynamicRoutes,
        ...(profileType === 'ADMIN'
          ? [
            { path: 'usuarios', element: <UserList /> },
            { path: 'tableros', element: <DashboardList /> },
          ]
          : [])
      ]
    },
    { path: 'login', element: <LoginPage /> },
    { path: '*', element: <Navigate to="/" /> }
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default AppRouter;