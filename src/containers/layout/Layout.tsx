import React from 'react';
import { Row, Col } from 'antd';

const Layout: React.FC = ({ children }) => {
  return (
    <Row className='fuq-layout' align='middle' justify='center'>
      <Col span={2}>{children}</Col>
    </Row>
  );
};

export default Layout;
