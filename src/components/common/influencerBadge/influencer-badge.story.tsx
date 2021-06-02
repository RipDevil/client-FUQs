import React from 'react';
import { Story } from '@storybook/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import '@fortawesome/fontawesome-free/css/all.css';
import 'antd/dist/antd.css';
import 'index.css';

import { InfluencerBadge as InfluencerBadgeComponent, InfluencerBadgeTypes } from './influencer-badge';
import { StyledCol, StyledRow } from 'components/common/createFuqCard/create-fuq-card.styled';
import { argTypes, args } from './lib';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Components/Common/Influencer Badge',
  component: InfluencerBadgeComponent,
  parameters: {
    controls: { sort: 'requiredFirst' },
  },
  args,
  argTypes,
};

export const InfluencerBadge: Story<InfluencerBadgeTypes> = ({ ...props }) => {
  return (
    <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
      <Route path={'/'}>
        <StyledCol>
          <StyledRow justify="center">
            <InfluencerBadgeComponent {...props} />
          </StyledRow>
        </StyledCol>
      </Route>
    </Router>
  );
};
