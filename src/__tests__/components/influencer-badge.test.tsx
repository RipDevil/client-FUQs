import { render, waitFor, cleanup, fireEvent, screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { InfluencerBadge } from 'components/common';

afterEach(() => {
  cleanup();
});

describe('Influencer badge tests', () => {
  it('Should render with no errors', () => {
    const { container } = render(
      <Router history={createMemoryHistory({ initialEntries: ['/fuq'] })}>
        <Route path={'/fuq'}>
          <InfluencerBadge url="/" />
        </Route>
      </Router>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should contain link which is passed via props', () => {
    const { container } = render(
      <Router history={createMemoryHistory({ initialEntries: ['/fuq'] })}>
        <Route path={'/fuq'}>
          <InfluencerBadge url="/test-link" />
        </Route>
        <Route path={'/test-link'}>
          <h1>Test</h1>
        </Route>
      </Router>,
    );
    const linkElement = container.querySelector('a[href="/test-link"]');

    expect(linkElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('Should not render if no url is passed', () => {
    const { container } = render(<InfluencerBadge />);
    expect(container).toMatchSnapshot();
  });

  it('Should redirect on the Link click', async () => {
    const { container, getByText } = render(
      <Router history={createMemoryHistory({ initialEntries: ['/fuq'] })}>
        <Route path={'/fuq'}>
          <InfluencerBadge url="/test-link" />
        </Route>
        <Route path={'/test-link'}>
          <h1>Test</h1>
        </Route>
      </Router>,
    );

    const linkElement = container.querySelector('a[href="/test-link"]');
    expect(linkElement).toBeInTheDocument();

    // ugly?
    expect(linkElement).not.toBeNull();
    if (linkElement) {
      fireEvent.click(linkElement);

      const isAnotherPage = await waitFor(() => {
        return getByText(/Test/i);
      });
      expect(isAnotherPage).toBeTruthy();
    }
  });
});
