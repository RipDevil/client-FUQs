import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { FuqType } from 'pages/fuq/model';
import { configUpdate } from 'config/model';
import { useSingleFuq } from 'api';

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

describe('Use single fuq hook test', () => {
  const parameter = '13';
  const res: FuqType = {
    _id: '13',
    likes: 0,
    _lastEditor: 'string',
    pending: false,
    title: 'string',
    text: 'string',
    crdate: 'string',
  };

  it('On 200 with param', async () => {
    mockAxios.onGet('/test/fuq/' + parameter).reply(200, res);

    await act(async () => {
      const { result, waitFor, unmount } = renderHook(() => useSingleFuq(parameter), { wrapper });

      await waitFor(() => {
        return result.current.isSuccess;
      });

      expect(result.current.data).not.toBeUndefined();
      if (result.current.data) {
        expect(result.current.data.text).not.toBeUndefined();
        expect(result.current.data.title).not.toBeUndefined();
        expect(result.current.data._id).toBe(parameter);
      }

      unmount();
    });
  });

  it('On any error with param', async () => {
    mockAxios.onGet('/test/fuq/' + parameter).reply(404);

    await act(async () => {
      const { result, waitFor, unmount } = renderHook(() => useSingleFuq(parameter), { wrapper });

      await waitFor(() => {
        return result.current.isError;
      });

      expect(result.current.isSuccess).not.toBeTruthy();
      expect(result.current.error).not.toBeNull();

      unmount();
    });
  });

  it('On 200 without param', async () => {
    mockAxios.onGet('/test/fuq').reply(200, res);

    await act(async () => {
      const { result, waitFor, unmount } = renderHook(() => useSingleFuq(), { wrapper });

      await waitFor(() => {
        return result.current.isSuccess;
      });

      expect(result.current.data).not.toBeUndefined();
      if (result.current.data) {
        expect(result.current.data.text).not.toBeUndefined();
        expect(result.current.data.title).not.toBeUndefined();
      }

      unmount();
    });
  });

  it('On any error without param', async () => {
    mockAxios.onGet('/test/fuq/').reply(404);

    await act(async () => {
      const { result, waitFor, unmount } = renderHook(() => useSingleFuq(), { wrapper });

      await waitFor(() => {
        return result.current.isError;
      });

      expect(result.current.isSuccess).not.toBeTruthy();
      expect(result.current.error).not.toBeNull();

      unmount();
    });
  });
});
