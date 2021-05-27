import styled from 'styled-components';
import { Typography, Col } from 'antd';

const { Title } = Typography;

export const StyledTitle = styled(Title)`
  font-size: 50px !important;
`;

export const StyledCol = styled(Col)`
  cursor: pointer;
  font-size: 20px;
  overflow-y: hidden;
  &:hover {
    .ant-space-item {
      color: inherit;
    }
    .ant-badge-count {
      background: #ff4d4f;
    }
  }

  .ant-space-item {
    transition: 250ms ease;
    color: transparent;
  }

  .ant-badge-count {
    transition: 250ms ease;
    background: none;
  }
`;
