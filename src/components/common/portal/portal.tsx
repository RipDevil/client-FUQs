import * as React from 'react';
import { Location } from 'history';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { PortalComponent } from './portal.styled';
import { CustomPortalLink } from './custom-portal-link';

export const Portal: React.FC = () => {
  const location = useLocation<Location>();

  const a = 'a';
  console.log('a :>> ', a);

  return (
    <PortalComponent>
      {location.pathname !== '/' && (
        <Link data-testid="portal-link-home" to="/" component={CustomPortalLink}>
          <HomeOutlined title="Main page" />
        </Link>
      )}
      <Link data-testid="portal-link-create" to="/create" component={CustomPortalLink}>
        <PlusCircleOutlined title="Create Page" />
      </Link>
    </PortalComponent>
  );
};
