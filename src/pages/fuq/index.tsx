import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Layout } from 'templates';
import { Spinner, FuqCard } from 'components/common';
import { useSingleFuq } from 'api';

export interface FuqMatchParams {
  id?: string;
}

const SingleFuq: React.FC<RouteComponentProps<FuqMatchParams>> = (props) => {
  const { isFetching, data: fuq, isSuccess, isError, error } = useSingleFuq(props.match.params.id);

  const fuqUrl: string = React.useMemo(() => {
    return `${window.location.href}fuq/${fuq?._id}`;
  }, [fuq?._id]);

  return (
    <Layout>
      {isError && error && <FuqCard text={error.message} title="Error" url={props.location.pathname} />}
      {isFetching && <Spinner text="Loading a FUQ" />}
      {isSuccess && <FuqCard text={fuq?.text || ''} title={fuq?.title || ''} url={fuqUrl} />}
    </Layout>
  );
};

export default SingleFuq;
