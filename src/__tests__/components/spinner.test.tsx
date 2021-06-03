import { render, screen } from '@testing-library/react';
import { Spinner } from 'components/common';

describe('Spinner tests', () => {
  it('Should be rendered not transparent and without text', () => {
    const { container } = render(<Spinner />);

    expect(container).toMatchSnapshot();
  });

  it('Should be rendered transparent', () => {
    const { container } = render(<Spinner transparent={true} />);

    expect(container).toMatchSnapshot();
  });

  it('Should be rendered with text', () => {
    render(<Spinner text={'Some text'} />);
    const element = screen.getByText(/Some text/i);
    expect(element).toBeInTheDocument();

    expect(element).toMatchSnapshot();
  });
});
