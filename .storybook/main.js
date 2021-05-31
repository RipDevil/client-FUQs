module.exports = {
  stories: ['../src/**/*.story.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    '@storybook/addon-controls',
    'storybook-addon-styled-component-theme',
    '@storybook/addon-a11y'
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript-plugin',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
};
