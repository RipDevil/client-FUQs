import * as React from 'react';

import { Layout } from 'templates';
import { Spinner, FuqCard } from 'components/common';
import { useSingleFuq } from 'api';

const Root: React.FC = () => {
  const { isFetching, data: fuq, isSuccess, isError, error } = useSingleFuq();

  return (
    <Layout>
      {isError && error && <FuqCard text={error.message} title='Error' />}
      {isFetching && <Spinner text='Loading a FUQ' />}
      {isSuccess && (
        <FuqCard text={fuq?.text || ''} title={fuq?.title || ''} />
      )}
    </Layout>
  );
};

export default Root;
