import * as React from 'react';
import Layout from 'containers/layout/Layout';

export interface AdminProps {}

const Admin: React.FC<AdminProps> = () => {
  return (
    <Layout>
      <b>/badmin</b>
    </Layout>
  );
};

export default Admin;
