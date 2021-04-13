import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { $config } from 'config/model';
import { call } from './lib';
import { UserType } from 'pages/admin/model';

/**
 * Can return a list of users
 */
export const useUsers = () => {
  const {
    api: { users },
    server,
  } = $config.getState();

  return useQuery<unknown, AxiosError, UserType[]>('Get a list of users', () => call(`${server}${users?.get}`, 'GET'));
};
