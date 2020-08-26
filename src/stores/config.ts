import { createStore } from 'effector';

import { configUpdate } from 'effects/config';
import { ConfigType } from './types';

const defaultConfig = {
  server: '',
  routes: {},
  api: {},
};

const $config = createStore<ConfigType>(defaultConfig);

$config.on(configUpdate, (_, payload): ConfigType => payload);

export default $config;
