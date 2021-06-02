import { render } from '@testing-library/react';
import { Credits } from 'components/common';

describe('Credits tests', () => {
  it('Should be rendered if in development', () => {
    const { container } = render(<Credits env={'development'} />);
    expect(container).toMatchSnapshot();
  });

  it('Should not be rendered if not in development mode', () => {
    const { container } = render(<Credits env={'gibberish'} />);
    const anyLink = container.querySelector('a');

    expect(anyLink).toBeNull();
  });
});
