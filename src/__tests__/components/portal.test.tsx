import { render, screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { Portal } from 'components/common';

beforeAll(() => {
  localStorage.setItem('fuqs-admin', 'true');
});

describe('when rendered', () => {
  it('in root route', async () => {
    render(
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <Route path={'/'} component={Portal} />
      </Router>,
    );

    expect(screen.queryAllByTestId(/portal-link-/).length).toEqual(1);
  });

  it('not in root route', async () => {
    render(
      <Router history={createMemoryHistory({ initialEntries: ['/create'] })}>
        <Route path={'/create'} component={Portal} />
      </Router>,
    );

    expect(screen.queryAllByTestId(/portal-link-/).length).toEqual(2);
  });
});
