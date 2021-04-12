import { createStore, createEvent } from 'effector';

export interface AuthType {
  token: string;
  refreshToken: string;
}

const defaultAuth = {
  token: '',
  refreshToken: '',
};

const $auth = createStore<AuthType>(defaultAuth);

const authUpdate = createEvent<AuthType>('update auth data (token and refresh token)');
const authReset = createEvent<any>('reset auth data (token and refresh token)');

$auth.on(authUpdate, (state, payload): AuthType => ({ ...state, ...payload })).reset(authReset);

export { authUpdate, authReset, $auth };
