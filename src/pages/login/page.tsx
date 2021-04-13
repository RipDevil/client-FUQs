import * as React from 'react';
import H from 'history';
import { useStore } from 'effector-react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Alert, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { Layout } from 'templates';
import { Spinner } from 'components/common';
import { useLogin } from 'api';
import { login as loginRules, password as passRules } from './lib';

import { authUpdate, $auth } from './model';

type FormTypes = {
  login: string;
  password: string;
};

const Login: React.FC = () => {
  const loginInputRef = React.createRef<Input>();

  const history = useHistory<H.History>();
  const authStore = useStore($auth);
  const { mutate: login, isError, isSuccess, data, isLoading, error } = useLogin();

  React.useEffect(() => {
    if (authStore.token !== '' && authStore.refreshToken !== '') {
      history.push('/badmin');
    }
  });

  React.useEffect(() => {
    loginInputRef && loginInputRef.current?.focus();
  }, [loginInputRef]);

  React.useEffect(() => {
    if (!isError && isSuccess && data) {
      authUpdate(data);
    }
  }, [isSuccess, isError, data]);

  const onFormFinished = (credentials: FormTypes) => {
    login(credentials);
  };

  return (
    <Layout>
      <Col span="6">
        <Row justify="center" style={{ margin: '10px' }}>
          {isLoading && <Spinner text="In process" />}
          {isError && (
            <Alert
              message={`${error?.name}:` || 'Error: '}
              description={error?.message || 'Some error has occuered'}
              type="error"
              showIcon
              closable
            />
          )}
          {isSuccess && (
            <Alert message="Success" description="Successfully logged in" type="success" showIcon closable />
          )}
        </Row>

        <Form
          size="large"
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFormFinished}
        >
          <Form.Item name="login" rules={loginRules}>
            <Input
              ref={loginInputRef}
              data-testid="login-input"
              maxLength={31}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Login"
            />
          </Form.Item>

          <Form.Item name="password" rules={passRules}>
            <Input.Password
              data-testid="password-input"
              maxLength={31}
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button data-testid="button-login" type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Layout>
  );
};

export default Login;
