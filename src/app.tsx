import * as React from 'react';
import { Switch, HashRouter } from 'react-router-dom';
import { message } from 'antd';

import { Routes } from 'routes';
import { Portal } from 'components/admin';

message.config({
  duration: 1,
});

const App: React.FC = () => {
  return (
    <HashRouter>
      <Portal />
      <Switch>
        <Routes />
      </Switch>
    </HashRouter>
  );
};

export default App;
