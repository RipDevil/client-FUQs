import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

import { $config } from 'config/model';
import { call } from './lib';
import { ReducedFuqType } from 'pages/create-fuq/model';
import { FuqType } from 'pages/fuq/model';

/**
 * Perform creating a new FUQ
 * @param newFuq
 */
export const usePutFuq = () => {
  const { server } = $config.getState();

  return useMutation<FuqType, AxiosError, ReducedFuqType>('Put FUQ', (newFuq) => call(`${server}/fuq`, 'PUT', newFuq));
};
