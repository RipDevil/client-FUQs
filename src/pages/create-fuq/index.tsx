import * as React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { message } from 'antd';
import { History as H } from 'history';

import { Layout } from 'templates';
import { usePutFuq } from 'api';
import { Spinner } from 'components/common';
import { CreateFuqCard, NewFuqFormTypes } from 'components/common/createFuqCard/create-fuq-card';

export interface CreateFuqMatchParams {
  id?: string;
}

const CreateFuq: React.FC<RouteComponentProps<CreateFuqMatchParams>> = (props) => {
  const { id } = props.match.params;

  const { mutateAsync: createFuq, isError, isLoading, isSuccess, data } = usePutFuq();
  const history = useHistory<H>();

  React.useEffect(() => {
    if (isSuccess && data?._id) {
      message.success({
        content: 'Success!',
      });

      history.push(`/fuq/${data._id}`);
    }
  }, [data, isSuccess]);

  React.useEffect(() => {
    isError &&
      message.error({
        content: 'Error!',
      });
  }, [isLoading, isError]);

  function onFormSubmit(values: NewFuqFormTypes) {
    createFuq(values);
  }

  return (
    <Layout>
      {isLoading && <Spinner transparent={false} text="Adding a new FUQ, mi' lad" />}
      <CreateFuqCard onSubmit={onFormSubmit} influencer={id} />
    </Layout>
  );
};

export default CreateFuq;
