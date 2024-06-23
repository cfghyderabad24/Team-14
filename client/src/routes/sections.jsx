/* eslint-disable import/no-unresolved */
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import { NGOPage } from 'src/sections/ngo/view';
import { Discussions } from 'src/sections/diss';
import { CourseFile } from 'src/sections/coursefile';
import { TrusteePage } from 'src/sections/trustee/view';
import { VolunteerPage } from 'src/sections/volunteer/view';
import { AluminiNotification } from 'src/sections/alumininotification';
import ScholarshipApprovalForm from 'src/sections/renewalform/renewal-view';
import VolunteerApprovalForm from 'src/sections/volunteerApproval/volunteerApproval';



export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const RegisterPage = lazy(() => import('src/pages/register'));


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        {path:'user',element:<UserPage/>},
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'renewalform', element: <ScholarshipApprovalForm /> },
        {path:'AluminiNotification',element:<AluminiNotification/>},
        {path:'CourseFile',element:<CourseFile/>},
        {path:'volunteer',element:<VolunteerPage/>},
        {path:'trustee',element:<TrusteePage/>},
        {path:'ngo',element:<NGOPage/>},
        {path:'coursefile',element:<CourseFile/>},
        {path:'volunteerapprovalform',element:<VolunteerApprovalForm/>},
        {path:'discussion',element:<Discussions/>},
        { path: 'volunteerApproval', element: <VolunteerApprovalForm/>}
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
