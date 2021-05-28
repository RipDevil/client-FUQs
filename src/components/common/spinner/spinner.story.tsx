import React from 'react';
import { Story } from '@storybook/react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'antd/dist/antd.css';
import 'index.css';

import { Spinner as SpinnerComponent, SpinnerProps } from 'components/common/spinner/spinner';
import { argTypes, args } from './lib';
import doc from './spinner.mdx';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Components/Common/Spinner',
  component: SpinnerComponent,
  parameters: {
    docs: {
      page: doc,
    },
  },
  args,
  argTypes,
};

export const Spinner: Story<SpinnerProps> = ({ ...props }) => {
  return <SpinnerComponent {...props} />;
};
