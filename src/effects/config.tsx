import { createEvent } from 'effector';

const configUpdate = createEvent<Object>('update config');

export {
  configUpdate
};