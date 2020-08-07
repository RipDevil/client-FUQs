import { createStore } from 'effector';

import { configUpdate } from 'effects/config';

const $config = createStore<Object>({});

$config
  .on(configUpdate, (_, payload) => payload);

export default $config;