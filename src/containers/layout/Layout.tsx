import React from 'react';
import styled from 'styled-components';
import { Row } from 'antd';

const StyledRow = styled(Row)`
  margin-top: 50vh;
`;

export interface LayoutProps {
  span?: number;
}

const Layout: React.FC<LayoutProps> = ({ children, span = 2 }) => {
  return (
    <StyledRow align='middle' justify='center'>
      {children}
    </StyledRow>
  );
};

export default Layout;
