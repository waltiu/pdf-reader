import { lazy } from "react";
import { HOME_PATH, LOGIN_PATH, TEST_PATH } from "./constant";

const Layout = lazy(() => import('@/layout'))
const Login = lazy(() => import('@/pages/login'))
const Pdf = lazy(() => import('@/pages/pdf'))
const Test = lazy(() => import('@/pages/test'))

const getRoutes = () => {
  return [
    {
      path: "/",
      element: <Layout />,
      children: [

      ],
    },
    { path: LOGIN_PATH, element: <Login /> },
    {
      path: '/pdf',
      element: <Pdf />,
    },
    {
      path: TEST_PATH,
      element: <Test />,
    },
  ]
}

export default getRoutes