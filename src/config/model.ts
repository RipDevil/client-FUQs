import { createStore, createEvent } from 'effector';
import defaultConfig from './defaultConfig';

export interface ConfigType {
  server: string;
}

const $config = createStore<ConfigType>(defaultConfig);

const configUpdate = createEvent<ConfigType>('update config');

$config.on(configUpdate, (state, payload): ConfigType => ({ ...state, ...payload }));

export { configUpdate, $config };
