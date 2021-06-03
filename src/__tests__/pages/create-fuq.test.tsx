import { Router, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createMemoryHistory } from 'history';
import { render, cleanup, waitFor, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { FuqType } from 'pages/fuq/model';
import { configUpdate } from 'config/model';
import { CreateFuq } from 'pages/create-fuq';

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

  configUpdate({
    server: 'test',
  });
});

afterEach(() => {
  mockAxios.reset();
  cleanup();
});

describe('Create FUQ page tests', () => {
  it('Should render the create FUQ page', () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Router history={createMemoryHistory({ initialEntries: ['/create'] })}>
          <Route path={'/create'} component={CreateFuq} />
        </Router>
      </QueryClientProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render an influencer if it exists', async () => {
    const FAKE_ID = '123fake123id';
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Router history={createMemoryHistory({ initialEntries: [`/create/${FAKE_ID}`] })}>
          <Route path={`/create/:id`} component={CreateFuq} />
        </Router>
      </QueryClientProvider>,
    );

    const linkElement = await waitFor(() => {
      return container.querySelector(`a[href="/fuq/${FAKE_ID}"]`);
    });

    expect(linkElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('After creation should be redirected to the /fuq/:id page', async () => {
    const res: FuqType = {
      _id: '13',
      likes: 0,
      _lastEditor: 'string',
      pending: false,
      title: 'string',
      text: 'string',
      crdate: 'string',
    };

    mockAxios.onPut('/test/fuq').reply(201, res);

    render(
      <QueryClientProvider client={queryClient}>
        <Router history={createMemoryHistory({ initialEntries: ['/create'] })}>
          <Route path={'/create'} component={CreateFuq} />
          <Route path={'/fuq/:id'}>
            <h1>Mock Page</h1>
          </Route>
        </Router>
      </QueryClientProvider>,
    );

    fireEvent.change(screen.getByTestId(/title-input/), { target: { value: 'string' } });
    fireEvent.change(screen.getByTestId(/text-input/), { target: { value: 'string' } });

    fireEvent.click(screen.getByTestId(/submit-form/));

    const isOnAnotherPage = await waitFor(() => {
      return screen.getByText(/Mock Page/i);
    });

    expect(isOnAnotherPage).toBeTruthy();
  });
});
