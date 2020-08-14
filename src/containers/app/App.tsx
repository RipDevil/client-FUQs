import React from 'react';
import { BrowserRouter, Switch, Route, RouteComponentProps, withRouter } from "react-router-dom";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <h1><b>/</b></h1>} />
        <Route exact path="/fuq/:id" component={() => <h1><b>/:id</b></h1>} />
        <Route exact path="/badmin" component={() => <h1><b>/badmin</b></h1>} />
        <Route exact path="*" component={() => <h1><b>/404</b></h1>} />
      </Switch>
    </BrowserRouter>
  );
};
// interface MatchParams {
//   id: string
// }

// const Test = withRouter(({match: { params } }: RouteComponentProps<MatchParams>): JSX.Element => {
//   const { id } = params;
//   return <span>{id}</span>
// });

export default App;
