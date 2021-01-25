import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { call } from './lib';
import { ConfigType } from 'config/model';

// type Params = {
//   [key: string]: string
// };

/**
 * Fetches the config file with basename
 */
export const useConfig = () => {
  return useQuery<ConfigType, string, AxiosError>('Get configuration file', () => call('/config.json', 'GET'));
};