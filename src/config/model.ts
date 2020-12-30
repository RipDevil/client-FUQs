import { createStore, createEvent } from 'effector';
import defaultConfig from './defaultConfig';

export interface ConfigType {
  server: string;
  api: {
    fuq?: {
      get?: string;
      put?: string;
      post?: string;
      delete?: string;
    };
  };
}

const $config = createStore<ConfigType>(defaultConfig);

const configUpdate = createEvent<ConfigType>('update config');

$config.on(
  configUpdate,
  (state, payload): ConfigType => ({ ...state, ...payload })
);

export { configUpdate, $config };
