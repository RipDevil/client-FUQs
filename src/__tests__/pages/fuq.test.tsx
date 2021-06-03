import { QueryClient, QueryClientProvider } from 'react-query';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, waitFor, cleanup } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { SingleFuq as FuqPage } from 'pages/fuq';

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
  it('Should render loader', async () => {
    mockAxios.onGet('/fuq').reply(200, {});

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
          <Route path={'/'} component={FuqPage} />
        </Router>
      </QueryClientProvider>,
    );

    const loadingElement = getByText('Loading a FUQ');
    expect(loadingElement).toBeInTheDocument();
    expect(document.body).toMatchSnapshot();
  });

  it('Should render FUQ', async () => {
    mockAxios.onGet('/fuq').reply(200, {
      _id: '13',
      likes: 0,
      _lastEditor: 'string',
      pending: false,
      title: 'string',
      text: 'string',
      crdate: 'string',
    });

    const { getAllByText } = render(
      <QueryClientProvider client={queryClient}>
        <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
          <Route path={'/'} component={FuqPage} />
        </Router>
      </QueryClientProvider>,
    );

    const resolvedElements = await waitFor(() => getAllByText('string'));
    resolvedElements.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
    expect(document.body).toMatchSnapshot();
  });

  it('Should render FUQ with params', async () => {
    mockAxios.onGet('/fuq/13').reply(200, {
      _id: '13',
      likes: 0,
      _lastEditor: 'string',
      pending: false,
      title: 'string',
      text: 'string',
      crdate: 'string',
    });

    const { getAllByText } = render(
      <QueryClientProvider client={queryClient}>
        <Router history={createMemoryHistory({ initialEntries: ['/fuq/13'] })}>
          <Route path={'/fuq/:id'} component={FuqPage} />
        </Router>
      </QueryClientProvider>,
    );

    const resolvedElements = await waitFor(() => getAllByText('string'));
    resolvedElements.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
    expect(document.body).toMatchSnapshot();
  });

  it('Should render error', async () => {
    mockAxios.onGet('/fuq/13').reply(404);

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Router history={createMemoryHistory({ initialEntries: ['/fuq/13'] })}>
          <Route path={'/fuq/:id'} component={FuqPage} />
        </Router>
      </QueryClientProvider>,
    );

    const resolvedElement = await waitFor(() => getByText('Error'));
    expect(resolvedElement).toBeInTheDocument();
    expect(document.body).toMatchSnapshot();
  });
});
