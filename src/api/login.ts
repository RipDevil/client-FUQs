import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

import { $config } from 'config/model';
import { call } from './lib';
import { AuthType } from 'pages/login/model';

interface CredentialsType {
  login: string;
  password: string;
}

/**
 * Perform login
 * @param credentials - { login, password }
 */
export const useLogin = () => {
  const {
    api: { auth },
    server,
  } = $config.getState();

  return useMutation<AuthType, AxiosError, CredentialsType, AuthType>('Login', (credentials) =>
    call(`${server}${auth?.login}`, 'POST', credentials),
  );
};
