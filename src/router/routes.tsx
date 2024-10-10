import Root from "containers/Root";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const loguedRoutes = createBrowserRouter([
  {
    path: '/', element: <Root />, children: [
      { index: true, element: <Navigate to={'/main'} /> },
      { path: '/main', element: <div></div> },
    ],
  },
  {
    path: '*',
    element: <Navigate to={'/'} />
  },
])