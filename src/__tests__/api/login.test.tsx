import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { AuthType } from 'pages/login/model';
import { configUpdate } from 'config/model';
import { useLogin } from 'api';

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
});

describe('Use login hook test', () => {
  const res: AuthType = {
    token: 'FAKE_TOKEN',
    refreshToken: 'FAKE_REFRESH_TOKEN',
  };

  it('On 200 with param', async () => {
    mockAxios.onPost('test/auth/login').reply(200, res);
    const { result, waitFor, unmount } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      result.current.mutate({ login: 'LOGIN', password: 'PASSWORD' });

      await waitFor(() => {
        return result.current.isSuccess;
      });

      expect(result.current.data).not.toBeUndefined();
      if (result.current.data) {
        expect(result.current.data.token).not.toBeUndefined();
        expect(result.current.data.refreshToken).not.toBeUndefined();
      }

      unmount();
    });
  });

  it('On any error', async () => {
    mockAxios.onPost('test/auth/login').reply(404);
    const { result, waitFor, unmount } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      result.current.mutate({ login: 'LOGIN', password: 'PASSWORD' });

      await waitFor(() => {
        return result.current.isError;
      });

      expect(result.current.isSuccess).not.toBeTruthy();
      expect(result.current.error).not.toBeNull();

      unmount();
    });
  });
});
