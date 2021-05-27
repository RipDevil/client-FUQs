import * as React from 'react';
import { Row, PageHeader, Space, Button, Table } from 'antd';

export const FuqsGrip: React.FC = () => {
  // useQuery ~> get fuqs

  const actions = {
    delete: () => {},
    change: () => {},
  };

  const cols = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (value: string, record: any) => (
        <b style={{ cursor: 'zoom-in' }} title={record.text}>
          {value}
        </b>
      ),
    },
    {
      title: 'Creation date',
      dataIndex: 'crdate',
      key: 'crdate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button onClick={actions.delete} type="link" block>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const mockData = [
    {
      key: 1,
      title: 'Sample fuq',
      text: 'Sample fuq text',
      crdate: 'idk lol',
    },
  ];

  return (
    <>
      <PageHeader backIcon={null} title="FUQs" subTitle="controll your fuqs, champ!" />
      <Row>
        <Table style={{ width: '100%' }} columns={cols} dataSource={mockData} />
      </Row>
    </>
  );
};
