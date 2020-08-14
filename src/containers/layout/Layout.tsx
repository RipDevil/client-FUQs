import React, { ReactNode } from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Row, Col } from 'antd';

const Layout: React.FunctionComponent<RouteComponentProps> = ({ children }) => {
  return (
    <Row style={{ marginTop: '50vh' }} align="middle" justify="center">
      <Col span={2}>{children}</Col>
    </Row>
  );
};

export default Layout;