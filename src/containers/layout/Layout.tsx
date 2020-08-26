import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';

const StyledRow = styled(Row)`
  margin-top: 50vh;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <StyledRow align='middle' justify='center'>
      <Col span={2}>{children}</Col>
    </StyledRow>
  );
};

export default Layout;
