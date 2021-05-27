import { render } from '@testing-library/react';
import { FuqsGrip } from 'components/admin';

test('FuqGrip should be rendered', () => {
  const { container } = render(<FuqsGrip />);
  expect(container).toMatchSnapshot();
});

//@mna: for now it's not used and all data inside is mocked
