import { render, screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { Portal } from 'components/admin';

beforeAll(() => {
  localStorage.setItem('fuqs-admin', 'true');
});

describe('when rendered', () => {
  it('in private route', async () => {
    render(
      <Router history={createMemoryHistory({ initialEntries: ['/login'] })}>
        <Route path={'/login'} component={Portal} />
      </Router>,
    );

    expect(screen.queryByTestId(/portal-link-login/)).toBeNull();
  });

  it('successfully', async () => {
    render(
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <Route path={'/'} component={Portal} />
      </Router>,
    );

    expect(screen.queryAllByTestId(/portal-link-/).length).toEqual(3);
  });
});
