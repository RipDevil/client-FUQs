import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

import '@fortawesome/fontawesome-free/css/all.css';
import 'antd/dist/antd.css';
import './index.css';

import App from 'app';
import { Credits } from 'components/common';
import { ConfigWrapper } from 'config';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.render(
  <QueryClientProvider client={client}>
    <ConfigWrapper>
      <Credits env={process.env.NODE_ENV} />
      <App />
      <ReactQueryDevtools />
    </ConfigWrapper>
  </QueryClientProvider>,
  document.getElementById('root'),
);
