import * as React from 'react';
import { Switch, HashRouter } from 'react-router-dom';

import { Routes } from 'routes';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Routes />
      </Switch>
    </HashRouter>
  );
};

export default App;
