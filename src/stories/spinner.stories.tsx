import React from 'react';
import { Story } from '@storybook/react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'antd/dist/antd.css';
import 'index.css';

import { Spinner, SpinnerProps } from 'components/common/spinner/spinner';

export default {
  title: 'Spinner',
  component: Spinner,
};

const TheSpinner: Story<SpinnerProps> = ({ text, transparent, ...props }) => {
  return <Spinner {...props} text={text} transparent={transparent} />;
};

export const Main = TheSpinner.bind({});

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
