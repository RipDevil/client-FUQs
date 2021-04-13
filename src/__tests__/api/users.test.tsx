import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { UserType } from 'pages/admin/model';
import { configUpdate } from 'config/model';
import { useUsers } from 'api';

let queryClient: any;
let wrapper: React.FC;
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
  wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  mockAxios = new MockAdapter(axios);

  configUpdate({
    server: 'test',
    api: {
      users: {
        get: '/users',
        put: '/users',
        post: '/users/:id',
        delete: '/users/:id',
      },
    },
  });
});

afterEach(() => {
  mockAxios.reset();
});

describe('Use users hook test', () => {
  const res: UserType[] = [
    {
      login: 'FAKE_LOGIN',
      _crdate: '25.06.95',
      fuqs: [],
      password: 'FAKE_PASS',
      deleted: false,
    },
    {
      login: 'FAKE_LOGIN_2',
      _crdate: '25.06.95',
      fuqs: [],
      password: 'FAKE_PASS+2',
      deleted: false,
    },
  ];

  it('Should return 200 on get users', async () => {
    mockAxios.onGet('/test/users').reply(200, res);

    await act(async () => {
      const { result, waitFor, unmount } = renderHook(() => useUsers(), { wrapper });

      await waitFor(() => {
        return result.current.isSuccess;
      });

      expect(result.current.data).not.toBeUndefined();
      expect(result.current.error).toBeNull();
      unmount();
    });
  });

  it('On error', async () => {
    mockAxios.onGet('/test/users').reply(404);

    await act(async () => {
      const { result, waitFor, unmount } = renderHook(() => useUsers(), { wrapper });

      await waitFor(() => {
        return result.current.isError;
      });

      expect(result.current.error).not.toBeNull();
      unmount();
    });
  });
});
