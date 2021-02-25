/* eslint-disable */
import React from 'react';
import { render } from '@testing-library/react';
import { Credits } from 'components/common/credits';

describe('Credits tests', () => {
  it('Should be rendered if in development', () => {
    const { getByText } = render(<Credits env={'development'} />);
    const [gitButton, fuqPrButton, repoButton, webInstanceLink] = [
      getByText(/Github/i),
      getByText(/\/fuq/i),
      getByText(/\/cli/i),
      getByText(/WebInstance/i),
    ];

    expect(gitButton).toBeInTheDocument();
    expect(gitButton).toMatchSnapshot();

    expect(fuqPrButton).toBeInTheDocument();
    expect(fuqPrButton).toMatchSnapshot();

    expect(repoButton).toBeInTheDocument();
    expect(repoButton).toMatchSnapshot();

    expect(webInstanceLink).toBeInTheDocument();
    expect(webInstanceLink).toMatchSnapshot();
  });

  it('Should not be rendered if not in development mode', () => {
    const { container } = render(<Credits env={'gibberish'} />);
    const anyLink = container.querySelector('a');

    expect(anyLink).toBeNull();
  });
});
