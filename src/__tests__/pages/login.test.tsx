import { QueryClient, QueryClientProvider } from 'react-query';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, waitFor, cleanup, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { authUpdate, authReset } from 'pages/login/model';

import { Login } from 'pages/login';
import { Admin } from 'pages/admin';

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
    render(
      <QueryClientProvider client={queryClient}>
        <Router history={createMemoryHistory({ initialEntries: ['/login'] })}>
          <Route path={'/login'} component={Login} />
          <Route path={'/badmin'} component={Admin} />
        </Router>
      </QueryClientProvider>,
    );

    // wait until a user is redirected to a page where you can find such element
    await waitFor(() => {
      const buttonOnBadminPage = screen.getByTestId(/0/);
      return buttonOnBadminPage;
    });

    expect(screen.getByTestId(/0/)).toBeTruthy();
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

    // The input has to be focused
    const loginInput = screen.getByTestId(/login-input/);
    expect(loginInput).toHaveFocus();
  });

  describe('Login form', () => {
    it('Login must be more than 3 and less than 30', async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <Router history={createMemoryHistory({ initialEntries: ['/login'] })}>
            <Route path={'/login'} component={Login} />
          </Router>
        </QueryClientProvider>,
      );

      const loginInput = screen.getByTestId(/login-input/);
      fireEvent.change(loginInput, { target: { value: 'q' } });

      const fuqTitle = await waitFor(() => {
        return screen.getByText(/Login must be more than 3 symbols/i);
      });

      expect(fuqTitle).toBeInTheDocument();
    });

    it('Pass must be more than 3 and less than 30', async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <Router history={createMemoryHistory({ initialEntries: ['/login'] })}>
            <Route path={'/login'} component={Login} />
          </Router>
        </QueryClientProvider>,
      );

      const passInput = screen.getByTestId(/password-input/);
      fireEvent.change(passInput, { target: { value: 'q' } });

      const fuqTitle = await waitFor(() => {
        return screen.getByText(/Password must be more than 3 symbols/i);
      });

      expect(fuqTitle).toBeInTheDocument();
    });

    it('Redirect to /badmin after success submit', async () => {
      mockAxios.onPost('/auth/login').reply(204, {
        ...FAKE_CREDENTIALS,
      });

      render(
        <QueryClientProvider client={queryClient}>
          <Router history={createMemoryHistory({ initialEntries: ['/login'] })}>
            <Route path={'/login'} component={Login} />
            <Route path={'/badmin'} component={Admin} />
          </Router>
        </QueryClientProvider>,
      );

      // enter text in the login input
      const loginInput = screen.getByTestId(/login-input/i);
      fireEvent.change(loginInput, { target: { value: 'TEST' } });

      await waitFor(() => {
        const _loginInput = screen.getByTestId(/login-input/i);
        return _loginInput.getAttribute('value') === 'TEST';
      });

      // enter text in the pass input
      const passInput = screen.getByTestId(/password-input/);
      fireEvent.change(passInput, { target: { value: 'TEST_PASSWORD' } });

      await waitFor(() => {
        const _passInput = screen.getByTestId(/password-input/);
        return _passInput.getAttribute('value') === 'TEST_PASSWORD';
      });

      // press the login button
      const loginButton = screen.getByTestId(/button-login/);
      fireEvent.click(loginButton);

      // wait until a user is redirected to a page where you can find such element
      await waitFor(() => {
        const buttonOnBadminPage = screen.getByTestId(/0/);
        return buttonOnBadminPage;
      });

      expect(screen.getByTestId(/0/)).toBeTruthy();
    });
  });
});
