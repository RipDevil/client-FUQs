import { createEvent } from 'effector';
import { ConfigType } from 'stores/config';
const configUpdate = createEvent<ConfigType>('update config');

export { configUpdate };
