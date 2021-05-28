import React from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

import '@fortawesome/fontawesome-free/css/all.css';
import 'antd/dist/antd.css';
import 'index.css';

import { Credits as ToggleCredits, CreditsTypes } from 'components/common/credits/credits';
import { argTypes, args } from './lib';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Components/Common/Credits',
  component: ToggleCredits,
  parameters: {
    controls: { sort: 'requiredFirst' },
  },
  args,
  argTypes,
};

const MockSpan = styled.span`
  div {
    position: relative !important;
  }
`;

export const Credits: Story<CreditsTypes> = ({ ...props }) => {
  return (
    <MockSpan>
      <ToggleCredits {...props} />
    </MockSpan>
  );
};
