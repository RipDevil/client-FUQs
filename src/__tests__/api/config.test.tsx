import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { useConfig } from 'api';

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
});

afterEach(() => {
  mockAxios.reset();
});

describe('Use config hook test', () => {
  it('On 200', async () => {
    mockAxios.onGet('/config.json').reply(200, {
      server: 'test',
    });

    const { result, waitFor } = renderHook(() => useConfig(), { wrapper });

    await waitFor(() => {
      return result.current.isSuccess;
    });

    expect(result.current.data).not.toBeUndefined();
    if (result.current.data) {
      expect(result.current.data.server).not.toBeUndefined();
      expect(result.current.data.server).toBe('test');
    }
  });

  it('On 404', async () => {
    mockAxios.onGet('/config.json').reply(404);

    const { result, waitFor } = renderHook(() => useConfig(), { wrapper });

    await waitFor(() => {
      return result.current.isError;
    });

    expect(result.current.isSuccess).not.toBeTruthy();
    expect(result.current.error).not.toBeNull();
  });
});
