import * as React from 'react';

import Layout from 'containers/layout/Layout';

export interface PageNotFoundProps {}

const PageNotFound: React.SFC<PageNotFoundProps> = () => {
  return (
    <Layout>
      <b>/404</b>
    </Layout>
  );
};

export default PageNotFound;
