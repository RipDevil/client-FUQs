import { render, waitFor, cleanup, fireEvent } from '@testing-library/react';

import { CreateFuqCard } from 'components/common';

afterEach(() => {
  cleanup();
});

describe('Create FUQ card tests', () => {
  it('Should render create FUQ card', () => {
    const { container } = render(<CreateFuqCard onSubmit={jest.fn} />);
    const titleInputElement = container.querySelector('input[data-testid=title-input]:focus');

    expect(titleInputElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('Should reset form if the reset button has been pressed', async () => {
    const TEST_VALUE = 'TEST VALUE';
    const { getByTestId } = render(<CreateFuqCard onSubmit={jest.fn} />);
    const clearFormButtonElement = getByTestId(/clear-form/);

    fireEvent.change(getByTestId(/title-input/), { target: { value: TEST_VALUE } });
    fireEvent.change(getByTestId(/text-input/), { target: { value: TEST_VALUE } });

    const inputsWithTestValueExist = await waitFor(() => {
      return (
        getByTestId(/title-input/).getAttribute('value') === TEST_VALUE &&
        getByTestId(/text-input/).innerHTML === TEST_VALUE
      );
    });
    expect(inputsWithTestValueExist).toBeTruthy();

    fireEvent.click(clearFormButtonElement);

    const inputsWithTestValueNotExist = await waitFor(() => {
      return (
        getByTestId(/title-input/).getAttribute('value') !== TEST_VALUE &&
        getByTestId(/text-input/).innerHTML !== TEST_VALUE
      );
    });

    expect(inputsWithTestValueNotExist).toBeTruthy();
  });
});
