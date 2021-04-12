import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, waitForElement, cleanup, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { authUpdate, authReset } from 'pages/login/model';

import Login from 'pages/login/page';
import Admin from 'pages/admin/page';

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

describe('Login page tests', () => {
  it('A user should be redirected to /badmin if has already authenticated', async () => {
    authUpdate(FAKE_CREDENTIALS);
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <Router history={createMemoryHistory({ initialEntries: ['/login'] })}>
          <Route path={'/login'} component={Login} />
          <Route path={'/badmin'} component={Admin} />
        </Router>
      </QueryClientProvider>,
    );

    // wait until a user is redirected to a page where you can find such element
    await waitForElement(() => {
      const buttonOnBadminPage = getByTestId('0');
      return buttonOnBadminPage;
    });

    expect(getByTestId('0')).toBeTruthy();
  });

  it('Page should be rendered if user has not authenticated', async () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Router history={createMemoryHistory({ initialEntries: ['/login'] })}>
          <Route path={'/login'} component={Login} />
        </Router>
      </QueryClientProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  describe('Login form', () => {
    it('Login must be more than 3 and less than 30', async () => {
      const { getByTestId, getByText } = render(
        <QueryClientProvider client={queryClient}>
          <Router history={createMemoryHistory({ initialEntries: ['/login'] })}>
            <Route path={'/login'} component={Login} />
          </Router>
        </QueryClientProvider>,
      );

      const loginInput = getByTestId('login-input');
      fireEvent.change(loginInput, { target: { value: 'q' } });

      await waitForElement(() => {
        const fuqTitle = getByText('Login must be more than 3 symbols');
        return fuqTitle;
      });

      expect(getByText('Login must be more than 3 symbols')).toBeTruthy();
    });

    it('Pass must be more than 3 and less than 30', async () => {
      const { getByTestId, getByText } = render(
        <QueryClientProvider client={queryClient}>
          <Router history={createMemoryHistory({ initialEntries: ['/login'] })}>
            <Route path={'/login'} component={Login} />
          </Router>
        </QueryClientProvider>,
      );

      const passInput = getByTestId('password-input');
      fireEvent.change(passInput, { target: { value: 'q' } });

      await waitForElement(() => {
        const fuqTitle = getByText('Password must be more than 3 symbols');
        return fuqTitle;
      });

      expect(getByText('Password must be more than 3 symbols')).toBeTruthy();
    });

    it('Redirect to /badmin after success submit', async () => {
      mockAxios.onPost('/auth/login').reply(204, {
        ...FAKE_CREDENTIALS,
      });

      const { getByTestId } = render(
        <QueryClientProvider client={queryClient}>
          <Router history={createMemoryHistory({ initialEntries: ['/login'] })}>
            <Route path={'/login'} component={Login} />
            <Route path={'/badmin'} component={Admin} />
          </Router>
        </QueryClientProvider>,
      );

      // enter text in the login input
      const loginInput = getByTestId('login-input');
      fireEvent.change(loginInput, { target: { value: 'TEST' } });

      await waitForElement(() => {
        const _loginInput = getByTestId('login-input');
        return _loginInput.getAttribute('value') === 'TEST';
      });

      // enter text in the pass input
      const passInput = getByTestId('password-input');
      fireEvent.change(passInput, { target: { value: 'TEST_PASSWORD' } });

      await waitForElement(() => {
        const _passInput = getByTestId('password-input');
        return _passInput.getAttribute('value') === 'TEST_PASSWORD';
      });

      // press the login button
      const loginButton = getByTestId('button-login');
      fireEvent.click(loginButton);

      // wait until a user is redirected to a page where you can find such element
      await waitForElement(() => {
        const buttonOnBadminPage = getByTestId('0');
        return buttonOnBadminPage;
      });

      expect(getByTestId('0')).toBeTruthy();
    });
  });
});
