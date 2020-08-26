import React from 'react';
import ReactDOM from 'react-dom';
import { ReactQueryConfigProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

import '@fortawesome/fontawesome-free/css/all.css';
import 'antd/dist/antd.css';
import './index.css';

import App from 'containers/app/App';
import Credits from 'credits';
import ConfigWrapper from 'containers/configWrapper/ConfigWrapper';

import * as serviceWorker from './serviceWorker';

const queries = {
  refetchOnWindowFocus: false,
  retry: false,
};

ReactDOM.render(
  <ReactQueryConfigProvider config={{ queries }}>
    <ConfigWrapper>
      <Credits />
      <App />
      <ReactQueryDevtools />
    </ConfigWrapper>
  </ReactQueryConfigProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
