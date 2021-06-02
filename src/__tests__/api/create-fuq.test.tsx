import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { ReducedFuqType } from 'pages/create-fuq/model';
import { FuqType } from 'pages/fuq/model';
import { configUpdate } from 'config/model';
import { usePutFuq } from 'api';
import { preparePostParams } from 'api/lib';

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

describe('Use post fuq hook test', () => {
  const newFuq: ReducedFuqType = {
    text: 'string',
    title: 'string',
  };

  const res: FuqType = {
    _id: '13',
    likes: 0,
    _lastEditor: 'string',
    pending: false,
    title: 'string',
    text: 'string',
    crdate: 'string',
  };

  it('201 on post with valid params', async () => {
    mockAxios.onPut('/test/fuq', preparePostParams(newFuq).toString()).reply(201, res);

    const { result, waitFor, unmount } = renderHook(() => usePutFuq(), { wrapper });
    await act(async () => {
      result.current.mutate(newFuq);

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

  it('On any error', async () => {
    mockAxios.onPut('/test/fuq', preparePostParams(newFuq).toString()).reply(404);
    const { result, waitFor, unmount } = renderHook(() => usePutFuq(), { wrapper });

    await act(async () => {
      result.current.mutate(newFuq);

      await waitFor(() => {
        return result.current.isError;
      });

      unmount();
    });
  });
});
