import { QueryClient, QueryClientProvider } from 'react-query';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, waitFor, cleanup, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { authUpdate, authReset } from 'pages/login/model';

import Admin from 'pages/admin/page';
import SingleFuq from 'pages/fuq/page';

const FAKE_CREDENTIALS = {
  token: 'FAKE_TOKEN',
  refreshToken: 'FAKE_REFRESH_TOKEN',
};

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
  authReset();
  cleanup();
});

describe('Admin page tests', () => {
  it('Admin page should NOT be rendered because of bad credentials', () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Router history={createMemoryHistory({ initialEntries: ['/badmin'] })}>
          <Route path={'/badmin'} component={Admin} />
        </Router>
      </QueryClientProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Admin page should be rendered with sub elements', async () => {
    authUpdate(FAKE_CREDENTIALS);

    mockAxios.onGet('/users').reply(200, []);

    const { container, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Router history={createMemoryHistory({ initialEntries: ['/badmin'] })}>
          <Route path={'/badmin'} component={Admin} />
        </Router>
      </QueryClientProvider>,
    );

    await waitFor(() => getByText('Actions'));

    expect(container).toMatchSnapshot();
  });

  it('User have to be redirected from admin page after logout', async () => {
    mockAxios.onPost('/auth/logout').reply(204, 'Success');
    authUpdate(FAKE_CREDENTIALS);
    const { getAllByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <Router history={createMemoryHistory({ initialEntries: ['/badmin'] })}>
          <Route path={'/badmin'} component={Admin} />
          <Route path={'/'} component={SingleFuq} />
        </Router>
      </QueryClientProvider>,
    );

    const logoutButton = getByTestId('logout-btn');
    fireEvent.click(logoutButton);

    mockAxios.onGet('/fuq').reply(200, {
      _id: '13',
      likes: 0,
      _lastEditor: 'string',
      pending: false,
      title: 'string',
      text: 'string',
      crdate: 'string',
    });

    await waitFor(() => {
      const fuqTitle = getAllByText('string');
      return fuqTitle.length === 2;
    });
  });

  it('On a grip click the menu should change', async () => {
    authUpdate(FAKE_CREDENTIALS);
    const { getByTitle, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <Router history={createMemoryHistory({ initialEntries: ['/badmin'] })}>
          <Route path={'/badmin'} component={Admin} />
        </Router>
      </QueryClientProvider>,
    );

    // @mna: default grip rn is the first one => 0
    expect(getByTitle('Users')).toBeTruthy();

    const itemButton = getByTestId('1');
    fireEvent.click(itemButton);

    await waitFor(() => {
      const fuqsGripTitle = getByTitle('FUQs');
      return fuqsGripTitle;
    });
  });
});
