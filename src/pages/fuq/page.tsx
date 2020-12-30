import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Layout } from 'templates';

export interface FuqMatchParams {
  id: string;
}

const Fuq: React.FC<RouteComponentProps<FuqMatchParams>> = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;

  return (
    <Layout>
      <b>/fuq/{id}</b>
    </Layout>
  );
};

export default Fuq;
