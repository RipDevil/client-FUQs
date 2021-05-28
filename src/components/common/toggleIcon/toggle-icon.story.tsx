import React from 'react';
import { Story } from '@storybook/react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'antd/dist/antd.css';
import 'index.css';

import { ToggleIcon as ToggleIconComponent, ToggleIconProps } from 'components/common/toggleIcon/toggle-icon';
import { argTypes, args } from './lib';

export default {
  title: 'Components/Common/Toggle Icon',
  component: ToggleIconComponent,
  parameters: {
    controls: { sort: 'requiredFirst' },
  },
  args,
  argTypes,
};

const spanStyle = { fontSize: 'xx-large' };
export const ToggleIcon: Story<ToggleIconProps> = ({ ...props }) => {
  return (
    <span style={spanStyle}>
      <ToggleIconComponent {...props} />
    </span>
  );
};
