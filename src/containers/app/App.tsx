import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, RouteChildrenProps, RouteComponentProps, withRouter } from "react-router-dom";
import { types } from 'util';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>main</div>
        </Route>
        <Route exact path="/:id">
          <Test name="123" />
        </Route>
        <Route exact path="/badmin">
          <div>badmin</div>
        </Route>
      </Switch>
    </Router>
  );
};

interface TestTypes {
  name: String
}

interface MatchParams {
  id: string
}

const Test = withRouter(({name, match: { params } }: RouteComponentProps<MatchParams> & TestTypes): JSX.Element => {
  const { id } = params;
  return <span>{id}</span>
});

export default App;
