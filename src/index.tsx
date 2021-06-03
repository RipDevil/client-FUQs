import ReactDOM from 'react-dom';
import { QueryClientProvider, QueryClient } from 'react-query';

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
    </ConfigWrapper>
  </QueryClientProvider>,
  document.getElementById('root'),
);
