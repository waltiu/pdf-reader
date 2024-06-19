import { lazy } from "react";
import { HOME_PATH, LOGIN_PATH, TEST_PATH } from "./constant";

const Layout = lazy(() => import('@/layout'))
const Login = lazy(() => import('@/pages/login'))
const Home = lazy(() => import('@/pages/home'))
const Test = lazy(() => import('@/pages/test'))

const getRoutes = () => {
  return [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: HOME_PATH,
          element: <Home />,
        },
        {
          path: TEST_PATH,
          element: <Test />,
        },
      ],
    },
    { path: LOGIN_PATH, element: <Login /> },
  ]
}

export default getRoutes