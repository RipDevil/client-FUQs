import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { ToggleIcon } from 'components/common';

import { ApiFilled, ApiOutlined } from '@ant-design/icons';

describe('ToggleIcon tests', () => {
  it('Should be rendered', async () => {
    const { container } = render(<ToggleIcon IconFrom={ApiFilled} IconTo={ApiOutlined} onClick={jest.fn()} />);

    expect(container).toMatchSnapshot();
  });

  it('Should be rendered with counter more than 0', async () => {
    const { container } = render(
      <ToggleIcon IconFrom={ApiFilled} IconTo={ApiOutlined} onClick={jest.fn()} title="Test title" counter={1000} />,
    );

    await waitFor(() => {
      const supElement = container.querySelector('sup');
      return supElement;
    });

    expect(container).toMatchSnapshot();
  });

  it('Should handle clicks', async () => {
    let callbackFunctionExecuted = false;
    function callback(value: boolean) {
      callbackFunctionExecuted = value;
    }

    const { container } = render(
      <ToggleIcon IconFrom={ApiFilled} IconTo={ApiOutlined} onClick={callback} title="Test title" counter={1000} />,
    );

    const iconElement = screen.getByTestId(/icon-span/);
    const iconFrom = container.querySelector('svg');
    const iconFromPath = container.querySelector('path')?.getAttribute('d');

    fireEvent.click(iconElement);

    await waitFor(() => {
      const newIconPath = container.querySelector('path')?.getAttribute('d');
      return iconFromPath !== newIconPath;
    });

    const iconTo = container.querySelector('svg');

    expect(iconFrom).not.toBeInTheDocument();
    expect(iconTo).toBeInTheDocument();
    expect(callbackFunctionExecuted).toBeTruthy();

    expect(container).toMatchSnapshot();
  });
});
