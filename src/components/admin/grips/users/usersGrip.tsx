import * as React from 'react';
import { Row, PageHeader, Space, Button, Table } from 'antd';

export interface UsersGripProps {}

export const UsersGrip: React.FC<UsersGripProps> = () => {
  // useQuery ~> get users

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
      title: 'Creation date',
      dataIndex: 'crdate',
      key: 'crdate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: any) =>
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

  const mockData = [
    {
      key: 1,
      login: 'RipDevil',
      crdate: 'idk lol',
    },
  ];

  return (
    <>
      <PageHeader backIcon={null} title="Users" subTitle="controll your users, champ!" />
      <Row>
        <Table style={{ width: '100%' }} columns={cols} dataSource={mockData} />
      </Row>
    </>
  );
};
