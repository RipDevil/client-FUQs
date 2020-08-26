import * as React from 'react';
import axios from 'axios';
import { useStore } from 'effector-react';
import { useQuery } from 'react-query';
// import { Row, Col } from 'antd';

import $config from 'stores/config';
import Layout from 'containers/layout/Layout';

export interface FuqProps {
  _id: string;
  likes: number;
  _lastEditor: string;
  pending: boolean;
  title: string;
  text: string;
  crdate: string;
}

const Root: React.FC = () => {
  const {
    api: { fuq },
    server,
  } = useStore($config);

  const { data, isSuccess, isError, error } = useQuery('Get a single FUQ', () =>
    axios.get(`${server}${fuq?.get}`).then((res): FuqProps => res.data)
  );

  return (
    <Layout span={24}>
      {isError && error && error.message}
      {isSuccess && data?.text}
    </Layout>
  );
};

export default Root;
