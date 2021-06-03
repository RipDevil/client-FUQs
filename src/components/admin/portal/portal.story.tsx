import { Story } from '@storybook/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import '@fortawesome/fontawesome-free/css/all.css';
import 'antd/dist/antd.css';
import 'index.css';

import { Portal as PortalComponents } from './portal';
import doc from './portal.mdx';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Components/Admin/Portal',
  component: PortalComponents,
  parameters: {
    controls: { sort: 'requiredFirst' },
    docs: {
      page: doc,
    },
  },
};

export const PrivateRoute: Story = ({ ...props }) => {
  return (
    <Router history={createMemoryHistory({ initialEntries: ['/login'] })}>
      <Route path={'/login'}>
        <PortalComponents {...props} />
      </Route>
    </Router>
  );
};

export const PublicRoute: Story = ({ ...props }) => {
  return (
    <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
      <Route path={'/'}>
        <PortalComponents {...props} />
      </Route>
    </Router>
  );
};
