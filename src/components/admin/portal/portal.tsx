import * as React from 'react';
import H from 'history';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, LoginOutlined } from '@ant-design/icons';

import { PortalComponent } from './portal.styled';
import { CustomPortalLink } from './custom-portal-link';

export const Portal: React.FC = () => {
  const location = useLocation<H.Location>();

  const isSneakyBastard = localStorage.getItem('fuqs-admin');
  if (!isSneakyBastard) {
    return null;
  }

  return (
    <PortalComponent>
      <Link
        to={location.pathname === '/login' || location.pathname === '/badmin' ? '' : '/login'}
        component={CustomPortalLink}
      >
        {location.pathname === '/login' || location.pathname === '/badmin' ? (
          <HomeOutlined title="Main page" />
        ) : (
          <LoginOutlined title="Login" />
        )}
      </Link>
    </PortalComponent>
  );
};
