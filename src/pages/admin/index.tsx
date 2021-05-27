import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { useStore } from 'effector-react';
import { MenuInfo } from 'rc-menu/lib/interface';
import { Menu, Col, Button, message } from 'antd';

import { AdminLayout } from 'templates';
import { UsersGrip, FuqsGrip } from 'components/admin';
import { $auth, authReset } from 'pages/login/model';
import { useLogout } from 'api';

const { Item } = Menu;

type ItemType = {
  key: number;
  title: string;
};

const DEFAULT_GRIP: string = '0';
const Admin: React.FC = () => {
  const [grip, setGrip] = React.useState<string>('Users');
  const authStore = useStore($auth);
  const [items] = React.useState<ItemType[]>([
    {
      key: 0,
      title: 'Users',
    },
    {
      key: 1,
      title: 'FUQs',
    },
  ]);

  const { mutate: logout, isError, isLoading, isSuccess } = useLogout();

  React.useEffect(() => {
    isError && message.warning('Can not log off');
  }, [isError]);

  React.useEffect(() => {
    isSuccess && authReset();
  }, [isSuccess]);

  const onItemClick = ({ key: reactKey }: MenuInfo) => {
    const key = reactKey.toString();
    setGrip(items[parseInt(key)].title);
  };

  // @mna: is this the best variant?
  if (authStore.refreshToken === '' || authStore.refreshToken === '') {
    return <Redirect to="/login" />;
  }

  return (
    <AdminLayout>
      <Col span={5}>
        <Button data-testid="logout-btn" onClick={logout} type="primary" loading={isLoading} block>
          Logout
        </Button>
        <Menu onClick={onItemClick} mode="inline" defaultSelectedKeys={[DEFAULT_GRIP]} style={{ height: '100%' }}>
          {items && items.length ? (
            items.map((item) => (
              <Item data-testid={item.key} key={item.key}>
                {item.title}
              </Item>
            ))
          ) : (
            <b>...</b>
          )}
        </Menu>
      </Col>
      <Col span={19} style={{ padding: '5px' }}>
        {grip === items[0].title && <UsersGrip />}
        {grip === items[1].title && <FuqsGrip />}
      </Col>
    </AdminLayout>
  );
};

export default Admin;
