import React from 'react';
import { render } from '@testing-library/react';
import Admin from 'pages/admin/page';

test('Admin page should be rendered', () => {
  const { container } = render(<Admin />);
  expect(container).toMatchSnapshot();
});
