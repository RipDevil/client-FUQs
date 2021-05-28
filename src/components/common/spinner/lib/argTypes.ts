export const argTypes = {
  text: {
    description: 'Text to be show below the cog',
    table: {
      type: {
        summary: 'string',
        detail: null,
      },
    },
    control: {
      type: 'text',
    },
  },
  transparent: {
    description: 'Should the background be transparent or not',
    table: {
      type: {
        summary: 'boolean',
        detail: 'shmoolean',
      },
    },
    control: {
      type: 'boolean',
    },
  },
};
