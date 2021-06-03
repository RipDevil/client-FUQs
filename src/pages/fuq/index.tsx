import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Layout } from 'templates';
import { Spinner, FuqCard } from 'components/common';
import { useSingleFuq } from 'api';

export interface FuqMatchParams {
  id?: string;
}

export const SingleFuq: React.FC<RouteComponentProps<FuqMatchParams>> = (props) => {
  const { isFetching, data: fuq, isSuccess, isError, error } = useSingleFuq(props.match.params.id);

  return (
    <Layout>
      {isError && error && <FuqCard text={error.message} title="Error" id={props.location.pathname} />}
      {isFetching && <Spinner text="Loading a FUQ" />}
      {isSuccess && fuq?._id && <FuqCard text={fuq?.text || ''} title={fuq?.title || ''} id={fuq._id} />}
    </Layout>
  );
};
