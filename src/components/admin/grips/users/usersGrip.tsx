import * as React from 'react';
import { Row, PageHeader, Space, Button, Table } from 'antd';

import { useUsers } from 'api';

export interface UsersGripProps {}

export const UsersGrip: React.FC<UsersGripProps> = () => {
  const { data: users, isSuccess, isLoading, isError } = useUsers();

  const actions = {
    delete: () => {
      // useMutation ~> delete a user +(DIALOG = YES | NO)
    },
  };

  const cols = [
    {
      title: 'Login',
      dataIndex: 'login',
      key: 'login',
    },
    {
      title: 'FUQs count',
      dataIndex: 'fuqs',
      key: 'fuqs',
    },
    {
      title: 'Deleted',
      dataIndex: 'deleted',
      key: 'deleted',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) =>
        record.login !== 'RipDevil' ? (
          <Space>
            <Button onClick={actions.delete} type="link" block>
              Delete
            </Button>
          </Space>
        ) : (
          <b title="This is a superuser. You have no rights deleting 'em">HOW DARE YOU!?</b>
        ),
    },
  ];

  return (
    <>
      <PageHeader backIcon={null} title="Users" subTitle="controll your users, champ!" />
      <Row>
        {isLoading && <p>Loading...</p>}
        {isError && <p style={{ color: 'red' }}>Error!</p>}
        {isSuccess && (
          <Table
            style={{ width: '100%' }}
            columns={cols}
            dataSource={users?.map((user, index) => ({
              key: `user.${index}`,
              fuqs: user.fuqs.length,
              deleted: user.deleted ? 'YES' : 'NO',
              login: user.login,
            }))}
          />
        )}
      </Row>
    </>
  );
};
