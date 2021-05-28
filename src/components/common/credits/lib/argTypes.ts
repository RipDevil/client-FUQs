export const argTypes = {
  env: {
    options: ['development', 'production'],
    control: {
      type: 'inline-radio',
      labels: {
        default: 'ENV development',
        small: 'ENV production',
      },
    },
  },
};
