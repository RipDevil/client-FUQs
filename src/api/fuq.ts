import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { $config } from 'config/model';
import { call } from './lib';
import { FuqType } from 'pages/root/model';

export const useSingleFuq = () => {
  const {
    api: { fuq },
    server,
  } = $config.getState();

  return useQuery<FuqType, string, AxiosError>('Get single FUQ', () => call(`${server}${fuq?.get}`, 'GET'));
};
