import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Fuq from 'containers/fuq/Fuq';
import Admin from 'containers/admin/Admin';
import PageNotFound from 'containers/404/404';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={() => <b>/</b>} />
        <Route exact path='/fuq/:id' component={Fuq} />
        <Route exact path='/badmin' component={Admin} />
        <Route exact path='*' component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
