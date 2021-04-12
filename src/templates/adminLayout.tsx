import React from 'react';
import styled from 'styled-components';
import { Row } from 'antd';

const StyledRow = styled(Row)`
  color: initial;
`;

export const AdminLayout: React.FC = ({ children }) => {
  return <StyledRow className="admin__layout">{children}</StyledRow>;
};
