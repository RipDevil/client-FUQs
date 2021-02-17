/* eslint-disable */
import React from 'react';
import { render } from '@testing-library/react';
import { Layout } from 'templates';

describe('Layout tests', () => {
  describe('Should render children if presented', () => {
    it('Text', () => {
      const { getByText } = render(<Layout>Test</Layout>);
      const testedElement = getByText(/Test/i);
      expect(testedElement).toBeInTheDocument();
      expect(testedElement).toMatchSnapshot();
    });

    it('Node', () => {
      const { getByTestId } = render(
        <Layout>
          <span data-testid="test">
            Text <span>Another test</span>
          </span>
        </Layout>,
      );
      const testedElement = getByTestId('test');
      expect(testedElement).toBeInTheDocument();
      expect(testedElement).toMatchSnapshot();
    });
  });

  it('Should render null if no children presented', () => {
    const { container } = render(<Layout></Layout>);
    const testedElement = container.querySelector('.ant-row');
    expect(testedElement).toBeEmpty();
    expect(testedElement).toMatchSnapshot();
  });
});
