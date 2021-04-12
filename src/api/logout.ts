import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

import { $config } from 'config/model';
import { $auth } from 'pages/login/model';
import { call } from './lib';

/**
 * Perform logout
 */
export const useLogout = () => {
  const {
    api: { auth },
    server,
  } = $config.getState();

  const { token } = $auth.getState();

  return useMutation<any, AxiosError, unknown, any>('Logout', (): any =>
    call(`${server}${auth?.logout}`, 'POST', undefined, token),
  );
};
