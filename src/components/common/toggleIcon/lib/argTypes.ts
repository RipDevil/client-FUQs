export const argTypes = {
  IconFrom: {
    description: 'An AntdIcon that will be displayed before click',
    table: {
      type: {
        summary: 'AntdIconType',
      },
    },
    control: null,
  },
  IconTo: {
    description: 'An AntdIcon that will be displayed after click',
    table: {
      type: {
        summary: 'AntdIconType',
      },
    },
    control: null,
  },
  onClick: {
    description: 'Function that is executed after click',
    table: {
      type: {
        summary: 'Function',
      },
    },
    control: null,
  },
  overflow: {
    default: 123,
  },
  size: {
    options: ['default', 'small'],
    control: {
      type: 'inline-radio',
      labels: {
        default: 'Default size',
        small: 'Small size',
      },
    },
  },
};
