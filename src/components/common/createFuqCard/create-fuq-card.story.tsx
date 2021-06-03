import { Story } from '@storybook/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import '@fortawesome/fontawesome-free/css/all.css';
import 'antd/dist/antd.css';
import 'index.css';

import {
  CreateFuqCard as CreateFuqCardComponent,
  CreateFuqCardProps,
} from 'components/common/createFuqCard/create-fuq-card';
import { argTypes, args } from './lib';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Components/Common/fuq/Create Fuq Card',
  component: CreateFuqCardComponent,
  parameters: {
    controls: { sort: 'requiredFirst' },
  },
  args,
  argTypes,
};

export const CreateFuqCard: Story<CreateFuqCardProps> = ({ ...props }) => {
  return (
    <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
      <Route path={'/'}>
        <CreateFuqCardComponent {...props} />
      </Route>
    </Router>
  );
};
