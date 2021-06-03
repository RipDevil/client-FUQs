import { render, screen } from '@testing-library/react';
import { AdminLayout } from 'templates';

describe('AdminLayout tests', () => {
  describe('Should render children if presented', () => {
    it('Text', () => {
      const { container } = render(<AdminLayout>Test</AdminLayout>);
      const testedElement = screen.getByText(/Test/i);
      expect(testedElement).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });

    it('Node', () => {
      const { container } = render(
        <AdminLayout>
          <span data-testid="test">
            Text <span>Another test</span>
          </span>
        </AdminLayout>,
      );
      const testedElement = screen.getByTestId(/test/);
      expect(testedElement).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });

  it('Should render null if no children presented', () => {
    const { container } = render(<AdminLayout></AdminLayout>);
    expect(container).toMatchSnapshot();
  });
});
