import * as React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Spinner from 'components/common/Spinner';

const Root = React.lazy(() => import('containers/root/Root'));
const Fuq = React.lazy(() => import('containers/fuq/Fuq'));
const Admin = React.lazy(() => import('containers/admin/Admin'));
const PageNotFound = React.lazy(() => import('containers/404/404'));

const App: React.FC = () => {
  return (
    // TODO: implement transition spinner
    <React.Suspense fallback={<Spinner text='Loading the page' />}>
      {/* HashRouter - for git pages */}
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Root} />
          <Route exact path='/fuq/:id' component={Fuq} />
          <Route exact path='/badmin' component={Admin} />
          <Route exact path='*' component={PageNotFound} />
        </Switch>
      </HashRouter>
    </React.Suspense>
  );
};

export default App;
