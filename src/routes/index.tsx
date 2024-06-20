import { lazy } from "react";

const Layout = lazy(() => import('@/layout'))
const Pdf = lazy(() => import('@/pages/pdf'))

const getRoutes = () => {
  return [
    {
      path: "/",
      element: <Layout />,
      children: [

      ],
    },

    {
      path: '/pdf',
      element: <Pdf />,
    },
 
  ]
}

export default getRoutes