import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { FuqCard } from 'components/common';

afterEach(() => {
  cleanup();
});

describe('FuqCard tests', () => {
  it('Should render and have all needed elements', () => {
    const { getByText, getAllByTestId, container } = render(
      <FuqCard title="Some title" url="fake/url/123" text="Some text" />,
    );

    const [elementWithTitle, elementWithText] = [getByText('Some title'), getByText('Some text')];
    const buttons = getAllByTestId('icon-span');

    expect(elementWithTitle).toBeInTheDocument();
    expect(elementWithText).toBeInTheDocument();
    expect(buttons.length).toEqual(2);
    expect(container).toMatchSnapshot();
  });

  it('Should redirect after pressing the influence button', async () => {
    const { getByText, getAllByTestId } = render(
      <Router history={createMemoryHistory({ initialEntries: ['/fuq/ID'] })}>
        <Route path={'/fuq/ID'}>
          <FuqCard title="Some title" url="/fake/url/123" text="Some text" />
        </Route>
        <Route path={'/'}>
          <h1>Test page</h1>
        </Route>
      </Router>,
    );

    const buttons = getAllByTestId('icon-span');
    buttons.forEach((b) => fireEvent.click(b));

    const testPageLabel = await waitFor(() => {
      const clock = getByText('Test page');
      return clock;
    });

    expect(testPageLabel).toBeInTheDocument();
  });

  it('Should copy to the clipboard after title click', async () => {
    const FAKE_URL = 'fake/url/123';

    const { getByText } = render(<FuqCard title="Some title" url={FAKE_URL} text="Some text" />);

    const titleElement = await waitFor(() => {
      const clock = getByText('Some title');
      return clock;
    });

    fireEvent.click(titleElement);

    const clipboardData = await waitFor(async () => {
      return (await navigator.clipboard.readText()) === FAKE_URL;
    });

    expect(clipboardData).toBeTruthy();
  });
});
