import * as React from 'react';

import { Row, Col, Typography } from 'antd';
import { StyledTitle } from './fuqCart.styled';

const { Title } = Typography;

export interface FuqCardProps {
  title: string;
  text: string;
}

export const FuqCard: React.FC<FuqCardProps> = ({ text, title }) => {
  return (
    <Col title={text}>
      <Row justify='center'>
        <StyledTitle type='danger' ellipsis={true}>
          {title}
        </StyledTitle>
      </Row>
      <Row justify='center'>
        <Title level={3} ellipsis={{ rows: 4 }}>
          {text}
        </Title>
      </Row>
    </Col>
  );
};
