import * as React from 'react';
import { Location } from 'history';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, LoginOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { PortalComponent, LinkStyled } from './portal.styled';
import { CustomPortalLink } from './custom-portal-link';

export const Portal: React.FC = () => {
  const location = useLocation<Location>();

  const { pathname } = location;
  const onPrivateRoute = pathname === '/login' || pathname === '/badmin';

  return (
    <PortalComponent>
      {!onPrivateRoute && (
        <LinkStyled data-testid="portal-link-login" to={'/login'} component={CustomPortalLink}>
          <LoginOutlined title="Login" />
        </LinkStyled>
      )}
      <Link data-testid="portal-link-home" to="/" component={CustomPortalLink}>
        <HomeOutlined title="Main page" />
      </Link>
      <Link data-testid="portal-link-create" to="/create" component={CustomPortalLink}>
        <PlusCircleOutlined title="Create Page" />
      </Link>
    </PortalComponent>
  );
};
