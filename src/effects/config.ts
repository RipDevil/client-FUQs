import { createEvent } from 'effector';
import { ConfigType } from 'stores/types';

const configUpdate = createEvent<ConfigType>('update config');

export { configUpdate };
