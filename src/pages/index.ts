import SingleFuq from './fuq';
import Admin from './admin';
import Login from './login';

import PageNotFound from './404';

export const routes = () => [
  {
    path: '/',
    exact: true,
    component: SingleFuq,
  },
  {
    path: '/fuq/:id',
    exact: true,
    component: SingleFuq,
  },
  {
    path: '/badmin',
    exact: true,
    component: Admin,
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  { component: PageNotFound },
];
