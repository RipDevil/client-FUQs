import { QueryClient, QueryClientProvider } from 'react-query';
import { render, waitFor, cleanup } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { ConfigWrapper } from 'config';

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
  cleanup();
});

describe('Config wrapper tests', () => {
  it('Should render child elements', async () => {
    mockAxios.onGet('/config.json').reply(200, {
      server: 'test',
    });

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <ConfigWrapper>{'test'}</ConfigWrapper>
      </QueryClientProvider>,
    );

    const loadingElement = getByText(/Loading config/i);
    expect(loadingElement).toBeInTheDocument();
    expect(document.body).toMatchSnapshot();

    const resolvedElement = await waitFor(() => getByText(/test/i));
    expect(resolvedElement).toBeInTheDocument();
    expect(document.body).toMatchSnapshot();
  });

  it('Should render nothing on get config error', async () => {
    mockAxios.onGet('/config.json').reply(404);

    render(
      <QueryClientProvider client={queryClient}>
        <ConfigWrapper>{'test'}</ConfigWrapper>
      </QueryClientProvider>,
    );

    await waitFor(() => document.body.querySelector('div')?.innerHTML === '');
    expect(document.body).toMatchSnapshot();
  });
});
