import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Layout from 'containers/layout/Layout';

export interface FuqMatchParams {
  id: string;
}

const Fuq: React.SFC<RouteComponentProps<FuqMatchParams>> = (props) => {
  console.log('props :>> ', props);
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
