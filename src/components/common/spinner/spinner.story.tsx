import React from 'react';
import { Story } from '@storybook/react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'antd/dist/antd.css';
import 'index.css';

import doc from './spinner.mdx';
import { Spinner as SpinnerComponent, SpinnerProps } from 'components/common/spinner/spinner';

export default {
  title: 'Components/Common/Spinner',
  component: SpinnerComponent,
  parameters: {
    docs: {
      page: doc,
    },
  },
};

export const Spinner: Story<SpinnerProps> = ({ text, transparent, ...props }) => {
  return <SpinnerComponent {...props} text={text} transparent={transparent} />;
};

Spinner.argTypes = {
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
