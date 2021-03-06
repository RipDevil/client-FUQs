import { render, screen } from '@testing-library/react';
import { Layout } from 'templates';

describe('Layout tests', () => {
  describe('Should render children if presented', () => {
    it('Text', () => {
      const { container } = render(<Layout>Test</Layout>);
      const testedElement = screen.getByText(/Test/i);
      expect(testedElement).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });

    it('Node', () => {
      const { container } = render(
        <Layout>
          <span data-testid="test">
            Text <span>Another test</span>
          </span>
        </Layout>,
      );
      const testedElement = screen.getByTestId(/test/);
      expect(testedElement).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });

  it('Should render null if no children presented', () => {
    const { container } = render(<Layout></Layout>);
    expect(container).toMatchSnapshot();
  });
});
