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
  title: 'Components/Common/Portal',
  component: PortalComponents,
  parameters: {
    controls: { sort: 'requiredFirst' },
    docs: {
      page: doc,
    },
  },
};

export const Portal: Story = ({ ...props }) => {
  return (
    <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
      <Route path={'/'}>
        <PortalComponents {...props} />
      </Route>
    </Router>
  );
};
