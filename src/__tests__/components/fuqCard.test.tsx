import { render } from '@testing-library/react';
import { FuqCard } from 'components/common';

test('FuqCard should be rendered', () => {
  const { getByText, container } = render(<FuqCard title="Some title" text="Some text" />);
  const [elementWithTitle, elementWithText] = [getByText('Some title'), getByText('Some text')];

  expect(elementWithTitle).toBeInTheDocument();
  expect(elementWithText).toBeInTheDocument();

  expect(container).toMatchSnapshot();
});
