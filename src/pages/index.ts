import Root from './root/page';
import Admin from './admin/page';
import Fuq from './fuq/page';

import PageNotFound from './404/page';

export const routes = () => [
  {
    path: '/',
    exact: true,
    component: Root,
  },
  {
    path: '/badmin',
    exact: true,
    component: Admin,
  },
  {
    path: '/fuq/:id',
    exact: true,
    component: Fuq,
  },

  { component: PageNotFound },
];
