import { render } from '@testing-library/react';
import { PageNotFound } from 'pages/404';

test('404 should be rendered', () => {
  const { container } = render(<PageNotFound />);
  expect(container).toMatchSnapshot();
});
