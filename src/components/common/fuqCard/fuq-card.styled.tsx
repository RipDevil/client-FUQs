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
  max-width: 90vw;
  text-align: center;
  &:hover {
    .ant-badge-count {
      color: #fff;
      box-shadow: inherit;
      background: #ff4d4f;
    }
  }
  .ant-badge-count {
    transition: 250ms ease;
    background: none;
    color: transparent;
    box-shadow: none;
  }
  .ant-btn-link {
    color: transparent;
    transition: 250ms ease;
  }
  &:hover {
    .ant-btn-link {
      color: #cc3333;
    }
  }
`;
