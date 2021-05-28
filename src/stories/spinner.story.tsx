import React from 'react';
import { Story } from '@storybook/react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'antd/dist/antd.css';
import 'index.css';

import doc from './docs/spinner.mdx';
import { Spinner, SpinnerProps } from 'components/common/spinner/spinner';

export default {
  title: 'Spinner',
  component: Spinner,
  parameters: {
    docs: {
      page: doc,
    },
  },
};

export const Main: Story<SpinnerProps> = ({ text, transparent, ...props }) => {
  return <Spinner {...props} text={text} transparent={transparent} />;
};

Main.bind({});

Main.argTypes = {
  text: {
    control: {
      type: 'text',
    },
  },
  transparent: {
    control: {
      type: 'boolean',
    },
  },
};
