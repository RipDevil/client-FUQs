/* eslint-disable */
import React from 'react';
import { render } from '@testing-library/react';
import { Credits } from 'components/common';

describe('Credits tests', () => {
  it('Should be rendered if in development', () => {
    const { getByText, container } = render(<Credits env={'development'} />);
    const [gitButton, fuqPrButton, repoButton, webInstanceLink] = [
      getByText(/Github/i),
      getByText(/\/fuq/i),
      getByText(/\/cli/i),
      getByText(/WebInstance/i),
    ];

    expect(gitButton).toBeInTheDocument();
    expect(fuqPrButton).toBeInTheDocument();
    expect(repoButton).toBeInTheDocument();
    expect(webInstanceLink).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('Should not be rendered if not in development mode', () => {
    const { container } = render(<Credits env={'gibberish'} />);
    const anyLink = container.querySelector('a');

    expect(anyLink).toBeNull();
  });
});
