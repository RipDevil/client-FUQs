const MAX = 30;
const MIN = 3;

export const login = [
  {
    required: true,
    message: 'Login is required',
  },
  {
    min: MIN,
    message: `Login must be more than ${MIN} symbols`,
  },
  {
    max: MAX,
    message: `Login must be less than ${MAX} symbols`,
  },
];

export const password = [
  {
    required: true,
    message: 'Pass  is required',
  },
  {
    min: MIN,
    message: `Password must be more than ${MIN} symbols`,
  },
  {
    max: MAX,
    message: `Password must be less than ${MAX} symbols`,
  },
];
