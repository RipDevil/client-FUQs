import React from 'react';
import styled from 'styled-components';
import { Row } from 'antd';

const StyledRow = styled(Row)`
  padding-top: 40vh;
  text-align: center;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <StyledRow align='middle' justify='center'>
      {children}
    </StyledRow>
  );
};

export default Layout;
