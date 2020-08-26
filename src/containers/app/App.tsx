import * as React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { useStore } from 'effector-react';

import Spinner from 'components/common/Spinner';
import $config from 'stores/config';

const Root = React.lazy(() => import('containers/root/Root'));
const Fuq = React.lazy(() => import('containers/fuq/Fuq'));
const Admin = React.lazy(() => import('containers/admin/Admin'));
const PageNotFound = React.lazy(() => import('containers/404/404'));

const App: React.FC = () => {
  const temp = useStore($config);
  return (
    // TODO: implement transition spinner
    <React.Suspense fallback={<Spinner text='Loading the page' />}>
      {/* HashRouter - for git pages */}
      <HashRouter>
        <Switch>
          <Route exact path={temp.routes.root} component={Root} />
          <Route exact path={temp.routes.fuq} component={Fuq} />
          <Route exact path={temp.routes.badmin} component={Admin} />
          <Route exact path='*' component={PageNotFound} />
        </Switch>
      </HashRouter>
    </React.Suspense>
  );
};

export default App;
