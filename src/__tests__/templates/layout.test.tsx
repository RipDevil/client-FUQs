/* eslint-disable */
import React from 'react';
import { render } from '@testing-library/react';
import { Layout } from 'templates';

describe('Layout tests', () => {
  describe('Should render children if presented', () => {
    it('Text', () => {
      const { getByText, container } = render(<Layout>Test</Layout>);
      const testedElement = getByText(/Test/i);
      expect(testedElement).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });

    it('Node', () => {
      const { getByTestId, container } = render(
        <Layout>
          <span data-testid="test">
            Text <span>Another test</span>
          </span>
        </Layout>,
      );
      const testedElement = getByTestId('test');
      expect(testedElement).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });

  it('Should render null if no children presented', () => {
    const { container } = render(<Layout></Layout>);
    const testedElement = container.querySelector('.ant-row');
    expect(testedElement).toBeEmpty();
    expect(container).toMatchSnapshot();
  });
});
