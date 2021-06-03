import { Story } from '@storybook/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import '@fortawesome/fontawesome-free/css/all.css';
import 'antd/dist/antd.css';
import 'index.css';

import { FuqCard as FuqCardComponent, FuqCardProps } from 'components/common/fuqCard/fuq-card';
import { argTypes, args } from './lib';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Components/Common/fuq/Fuq Card',
  component: FuqCardComponent,
  parameters: {
    controls: { sort: 'requiredFirst' },
  },
  args,
  argTypes,
};

export const FuqCard: Story<FuqCardProps> = ({ ...props }) => {
  return (
    <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
      <Route path={'/'}>
        <FuqCardComponent {...props} />
      </Route>
    </Router>
  );
};
