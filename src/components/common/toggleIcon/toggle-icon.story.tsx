import React from 'react';
import { Story } from '@storybook/react';

import { LikeFilled, LikeOutlined } from '@ant-design/icons';

import '@fortawesome/fontawesome-free/css/all.css';
import 'antd/dist/antd.css';
import 'index.css';

import doc from './toggle-icon.mdx';
import { ToggleIcon as ToggleIconComponent, ToggleIconProps } from 'components/common/toggleIcon/toggle-icon';

export default {
  title: 'Components/Common/Toggle Icon',
  component: ToggleIconComponent,
  parameters: {
    controls: { sort: 'requiredFirst' },
    docs: {
      page: doc,
    },
  },
  args: {
    counter: 0,
    overflow: 100,
    size: 'default',
    title: 'Some title',
  },
  argTypes: {
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
  },
};

export const ToggleIcon: Story<ToggleIconProps> = ({ ...props }) => {
  return <ToggleIconComponent {...props} IconFrom={LikeOutlined} IconTo={LikeFilled} onClick={() => {}} />;
};
