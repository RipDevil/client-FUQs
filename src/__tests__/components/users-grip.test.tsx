import { QueryClient, QueryClientProvider } from 'react-query';
import { render, waitFor, cleanup } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { authUpdate, authReset } from 'pages/login/model';
import { UserType } from 'pages/admin/model';
import { UsersGrip } from 'components/admin';

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

describe('UsersGrip tests', () => {
  it('FuqGrip should render Loading', async () => {
    authUpdate(FAKE_CREDENTIALS);
    mockAxios.onGet('/users').reply(200, []);

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <UsersGrip />
      </QueryClientProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('FuqGrip should render Error', async () => {
    authUpdate(FAKE_CREDENTIALS);
    mockAxios.onGet('/users').reply(500, new Error('FAKE ERROR'));

    const { container, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <UsersGrip />
      </QueryClientProvider>,
    );

    await waitFor(() => getByText(/Error!/i));

    expect(container).toMatchSnapshot();
  });

  it('FuqGrip should be rendered with users', async () => {
    const usersResult: UserType[] = [
      {
        login: 'FAKE_LOGIN',
        fuqs: [],
        deleted: false,
      },
      {
        login: 'FAKE_LOGIN_2',
        fuqs: [],
        deleted: false,
      },
    ];

    authUpdate(FAKE_CREDENTIALS);
    mockAxios.onGet('/users').reply(200, usersResult);

    const { container, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <UsersGrip />
      </QueryClientProvider>,
    );

    await waitFor(() => getByText(/FAKE_LOGIN_2/i));

    expect(container).toMatchSnapshot();
  });
});
