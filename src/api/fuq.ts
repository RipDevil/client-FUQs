import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { $config } from 'config/model';
import { call } from './lib';
import { FuqType } from 'pages/fuq/model';

/**
 * Can return a single FUQ randomly or not if the ID param is presented
 * @param id - id of a FUQ
 */
export const useSingleFuq = (id?:string) => {
  const {
    api: { fuq },
    server,
  } = $config.getState();

  return useQuery<FuqType, string, AxiosError>(`Get ${id ? 'random' : 'single'} FUQ`, () => call(`${server}${fuq?.get}${id ? '/'+id : ''}`, 'GET'));
};
