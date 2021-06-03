import { QueryClient, QueryClientProvider } from 'react-query';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, waitFor, cleanup, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { authUpdate, authReset } from 'pages/login/model';

import { Admin } from 'pages/admin';
import { Login } from 'pages/login';

const FAKE_CREDENTIALS = {
  token: 'FAKE_TOKEN',
  refreshToken: 'FAKE_REFRESH_TOKEN',
};

let queryClient: any;
let mockAxios: any;

beforeAll(() => {
  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
  mockAxios = new MockAdapter(axios);
});

afterEach(() => {
  mockAxios.reset();
  authReset();
  cleanup();
});

describe('Admin page tests', () => {
  it('Admin page should NOT be rendered because of bad credentials', async () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Router history={createMemoryHistory({ initialEntries: ['/badmin'] })}>
          <Route path={'/badmin'} component={Admin} />
          <Route path={'/login'} component={Login} />
        </Router>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const loginButton = screen.getByTestId(/button-login/);
      return loginButton;
    });

    expect(container).toMatchSnapshot();
  });

  it('Admin page should be rendered with sub elements', async () => {
    authUpdate(FAKE_CREDENTIALS);

    mockAxios.onGet('/users').reply(200, []);

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Router history={createMemoryHistory({ initialEntries: ['/badmin'] })}>
          <Route path={'/badmin'} component={Admin} />
        </Router>
      </QueryClientProvider>,
    );

    await waitFor(() => screen.getByText(/Actions/i));

    expect(container).toMatchSnapshot();
  });

  it('User have to be redirected to the login page from admin page after logout', async () => {
    mockAxios.onPost('/auth/logout').reply(204, 'Success');
    authUpdate(FAKE_CREDENTIALS);
    render(
      <QueryClientProvider client={queryClient}>
        <Router history={createMemoryHistory({ initialEntries: ['/badmin'] })}>
          <Route path={'/badmin'} component={Admin} />
          <Route path={'/login'} component={Login} />
        </Router>
      </QueryClientProvider>,
    );

    const logoutButton = screen.getByTestId(/logout-btn/);
    fireEvent.click(logoutButton);

    await waitFor(() => {
      const loginButton = screen.getByTestId(/button-login/);
      return loginButton;
    });
  });

  it('On a grip click the menu should change', async () => {
    authUpdate(FAKE_CREDENTIALS);
    render(
      <QueryClientProvider client={queryClient}>
        <Router history={createMemoryHistory({ initialEntries: ['/badmin'] })}>
          <Route path={'/badmin'} component={Admin} />
        </Router>
      </QueryClientProvider>,
    );

    // @mna: default grip rn is the first one => 0
    expect(screen.getAllByTitle(/Users/i).length).toBeTruthy();

    const itemButton = screen.getByTestId(/1/);
    fireEvent.click(itemButton);

    await waitFor(() => {
      const fuqsGripTitle = screen.getAllByTitle(/FUQs/i);
      return fuqsGripTitle;
    });
  });
});
