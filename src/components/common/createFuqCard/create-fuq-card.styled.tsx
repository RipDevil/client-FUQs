import styled from 'styled-components';
import { Col, Input, Row, Typography } from 'antd';

export const StyledInputLarge = styled(Input)`
  font-size: 50px !important;
  color: #ff4d4f;
  text-align: center;
  font-weight: 600;
  margin-bottom: 0.5em;
  line-height: 1.23;
`;

export const StyledTextArea = styled(Input.TextArea)`
  font-size: 24px !important;
  text-align: center;
  font-weight: 600;
  margin-bottom: 0.5em;
  line-height: 1.35 !important;
  textarea {
    line-height: 1.35 !important;
  }
`;

export const StyledCol = styled(Col)`
  font-size: 20px;
  overflow-y: hidden;
  max-width: 90vw;
  text-align: center;
  .ant-btn-link {
    color: transparent;
    transition: 250ms ease;
  }
  .ant-btn-link:focus {
    color: #cc3333;
    border-bottom: solid 1px #c33;
  }
  &:hover {
    .ant-btn-link {
      color: #cc3333;
    }
  }
`;

export const StyledRow = styled(Row)`
  cursor: pointer;
`;

export const StyledText = styled(Typography.Text)`
  font-size: small;
  font-style: italic;
`;
