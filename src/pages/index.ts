import { SingleFuq } from './fuq';
import { Admin } from './admin';
import { Login } from './login';
import { CreateFuq } from './create-fuq';

import { PageNotFound } from './404';

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
  {
    path: '/create/:id',
    exact: true,
    component: CreateFuq,
  },
  {
    path: '/create',
    exact: true,
    component: CreateFuq,
  },
  { component: PageNotFound },
];
