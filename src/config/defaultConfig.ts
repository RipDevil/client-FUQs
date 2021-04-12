const defaultConfig = {
  server: '',
  api: {
    fuq: {
      get: '/fuq',
      put: '/fuq',
      post: '/fuq/:id',
      delete: '/fuq/:id',
    },
    users: {
      get: '/users',
      put: '/users',
      post: '/users/:id',
      delete: '/users/:id',
    },
    auth: {
      login: '/auth/login',
      refresh: '/auth/refresh',
      logout: '/auth/logout',
    },
  },
};

export default defaultConfig;
