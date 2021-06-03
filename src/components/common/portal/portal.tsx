import * as React from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { PortalComponent } from './portal.styled';
import { CustomPortalLink } from './custom-portal-link';

export const Portal: React.FC = () => {
  return (
    <PortalComponent>
      <Link data-testid="portal-link-home" to="/" component={CustomPortalLink}>
        <HomeOutlined title="Main page" />
      </Link>
      <Link data-testid="portal-link-create" to="/create" component={CustomPortalLink}>
        <PlusCircleOutlined title="Create Page" />
      </Link>
    </PortalComponent>
  );
};
