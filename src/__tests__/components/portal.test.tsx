import { render } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { Portal } from 'components/admin';

beforeAll(() => {
  localStorage.setItem('fuqs-admin', 'true');
});

describe('Portal element tests', () => {
  describe('Portal should be rendered', () => {
    test('on /login or /badmin', () => {
      const { container: first } = render(
        <Router history={createMemoryHistory({ initialEntries: ['/login'] })}>
          <Route path={'/login'} component={Portal} />
        </Router>,
      );

      const { container: second } = render(
        <Router history={createMemoryHistory({ initialEntries: ['/badmin'] })}>
          <Route path={'/badmin'} component={Portal} />
        </Router>,
      );

      // TODO: isn't it too expensive?
      expect(first.innerHTML).toBe(second.innerHTML);
      expect(second).toMatchSnapshot();
    });

    test('on /else', () => {
      const { container } = render(
        <Router history={createMemoryHistory({ initialEntries: ['/else'] })}>
          <Route path={'/else'} component={Portal} />
        </Router>,
      );

      expect(container).toMatchSnapshot();
    });
  });

  it('Should not be rendered if no local storage field presented', () => {
    localStorage.removeItem('fuqs-admin');

    const { container } = render(
      <Router history={createMemoryHistory({ initialEntries: ['/badmin'] })}>
        <Route path={'/badmin'} component={Portal} />
      </Router>,
    );

    expect(container).toMatchSnapshot();
  });
});
