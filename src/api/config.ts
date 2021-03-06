import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { call } from './lib';
import { ConfigType } from 'config/model';

/**
 * Fetches the config file with basename
 */
export const useConfig = () => {
  return useQuery<unknown, AxiosError, ConfigType>('Get configuration file', () => call('/config.json', 'GET'));
};
