import SingleFuq from './fuq/page';
import Admin from './admin/page';
import Login from './login/page';

import PageNotFound from './404/page';

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
