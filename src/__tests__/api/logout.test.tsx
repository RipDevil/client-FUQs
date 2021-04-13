import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { authUpdate, authReset } from 'pages/login/model';
import { configUpdate } from 'config/model';
import { useLogout } from 'api';

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
    api: {
      auth: {
        login: '/auth/login',
        refresh: '/auth/refresh',
        logout: '/auth/logout',
      },
    },
  });
});

afterEach(() => {
  mockAxios.reset();
  authReset();
});

describe('Use logout hook test', () => {
  it('On 200 with param', async () => {
    authUpdate(FAKE_CREDENTIALS);
    mockAxios
      .onPost(
        'test/auth/logout',
        undefined,
        expect.objectContaining({
          Authorization: expect.stringMatching(/^Bearer /),
        }),
      )
      .reply(200)
      .onAny('test/auth/logout')
      .reply(401);

    const { result, waitFor, unmount } = renderHook(() => useLogout(), { wrapper });

    await act(async () => {
      result.current.mutate(new MouseEvent('click'));

      await waitFor(() => {
        return result.current.isSuccess;
      });

      unmount();
    });
  });

  it('On any error', async () => {
    authUpdate({ refreshToken: 'FAKE_REFRESH_TOKEN', token: 'FAKE_TOKEN' });
    mockAxios.onPost('test/auth/logout').reply(404);
    const { result, waitFor, unmount } = renderHook(() => useLogout(), { wrapper });

    await act(async () => {
      result.current.mutate(new MouseEvent('click'));

      await waitFor(() => {
        return result.current.isError;
      });

      unmount();
    });
  });
});
