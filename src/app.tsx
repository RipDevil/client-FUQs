import * as React from 'react';
import { Switch, HashRouter } from 'react-router-dom';

import { Routes } from 'routes';
import { Portal } from 'components/admin';

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
