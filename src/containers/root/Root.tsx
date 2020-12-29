import * as React from 'react';
import axios from 'axios';
import { useStore } from 'effector-react';
import { useQuery } from 'react-query';

import $config from 'stores/config';
import Layout from 'containers/layout/Layout';
import Spinner from 'components/common/Spinner';
import FuqCard from 'components/common/FuqCard';

export interface GetFuqResponse {
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

  const {
    isFetching,
    data,
    isSuccess,
    isError,
    error,
  } = useQuery('Get a single FUQ', () =>
    axios.get(`${server}${fuq?.get}`).then((res): GetFuqResponse => res.data)
  );

  return (
    <Layout>
      {isError && error && error.message}
      {isFetching && <Spinner transparent={true} text='Loading a FUQ' />}
      {isSuccess && <FuqCard text={data?.text} title={data?.title}/>}
    </Layout>
  );
};

export default Root;
