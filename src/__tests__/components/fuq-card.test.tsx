import { render, cleanup, fireEvent, waitFor, screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { FuqCard } from 'components/common';

afterEach(() => {
  cleanup();
});

describe('FuqCard tests', () => {
  const FAKE_ID = '123';
  it('Should render and have all needed elements', () => {
    const { getByText, getAllByTestId, container } = render(
      <FuqCard title="Some title" id={FAKE_ID} text="Some text" />,
    );

    const [elementWithTitle, elementWithText] = [getByText(/Some title/i), getByText(/Some text/i)];
    const buttons = getAllByTestId(/icon-span/);

    expect(elementWithTitle).toBeInTheDocument();
    expect(elementWithText).toBeInTheDocument();
    expect(buttons.length).toEqual(2);
    expect(container).toMatchSnapshot();
  });

  it('Should redirect after pressing the influence button', async () => {
    const { getByText, getAllByTestId } = render(
      <Router history={createMemoryHistory({ initialEntries: ['/fuq/ID'] })}>
        <Route path={'/fuq/ID'}>
          <FuqCard title="Some title" id={FAKE_ID} text="Some text" />
        </Route>
        <Route path={'/'}>
          <h1>Test page</h1>
        </Route>
      </Router>,
    );

    const buttons = getAllByTestId(/icon-span/);
    buttons.forEach((b) => fireEvent.click(b));

    const testPageLabel = await waitFor(() => {
      const clock = getByText(/Test page/i);
      return clock;
    });

    expect(testPageLabel).toBeInTheDocument();
  });

  it('Should copy to the clipboard after title click', async () => {
    const { getByText } = render(<FuqCard title="Some title" id={FAKE_ID} text="Some text" />);

    const titleElement = await waitFor(() => {
      const clock = getByText(/Some title/i);
      return clock;
    });

    fireEvent.click(titleElement);

    const clipboardData = await waitFor(async () => {
      return (await navigator.clipboard.readText()) === `http://localhost/fuq/${FAKE_ID}`;
    });

    expect(clipboardData).toBeTruthy();
  });
});
