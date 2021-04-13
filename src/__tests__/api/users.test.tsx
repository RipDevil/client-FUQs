import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { UserType } from 'pages/admin/model';
import { configUpdate } from 'config/model';
import { authUpdate, authReset } from 'pages/login/model';
import { useUsers } from 'api';

const FAKE_CREDENTIALS = { refreshToken: 'FAKE_REFRESH_TOKEN', token: 'FAKE_TOKEN' };

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
  });
});

afterEach(() => {
  mockAxios.reset();
  authReset();
});

describe('Use users hook test', () => {
  const res: UserType[] = [
    {
      login: 'FAKE_LOGIN',
      fuqs: [],
      password: 'FAKE_PASS',
      deleted: false,
    },
    {
      login: 'FAKE_LOGIN_2',
      fuqs: [],
      password: 'FAKE_PASS+2',
      deleted: false,
    },
  ];

  it('Should return 200 on get users', async () => {
    authUpdate(FAKE_CREDENTIALS);
    mockAxios
      .onGet(
        '/test/users',
        undefined,
        expect.objectContaining({
          Authorization: expect.stringMatching(/^Bearer /),
        }),
      )
      .reply(200, res)
      .onAny('test/users')
      .reply(401);

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
