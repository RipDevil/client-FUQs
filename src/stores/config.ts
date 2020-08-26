import { createStore } from 'effector';

import { configUpdate } from 'effects/config';

export interface ConfigType {
  server: string;
  routes: {
    fuq?: string;
    badmin?: string;
    root?: string;
  };
}

const $config = createStore<ConfigType>({ server: '', routes: {} });

$config.on(configUpdate, (_, payload): ConfigType => payload);

export default $config;
