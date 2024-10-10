import { RouterProvider } from 'react-router-dom'
import { loguedRoutes } from './routes'

const AppRouter = () => {
  return (
    <RouterProvider router={loguedRoutes} />
  )
}

export default AppRouter