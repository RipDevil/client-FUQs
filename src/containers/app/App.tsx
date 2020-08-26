import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Spinner from 'components/common/Spinner';

const Fuq = React.lazy(() => import('containers/fuq/Fuq'));
const Admin = React.lazy(() => import('containers/admin/Admin'));
const PageNotFound = React.lazy(() => import('containers/404/404'));

const App: React.FC = () => {
  return (
    <React.Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={() => <b>/</b>} />
          <Route exact path='/fuq/:id' component={Fuq} />
          <Route exact path='/badmin' component={Admin} />
          <Route exact path='*' component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </React.Suspense>
  );
};

export default App;
