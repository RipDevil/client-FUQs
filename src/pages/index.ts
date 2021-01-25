import SingleFuq from './fuq/page';
import Admin from './admin/page';

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
  { component: PageNotFound },
];
