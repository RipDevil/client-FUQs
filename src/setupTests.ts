// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

global.console = {
  ...global.console,
  error: jest.fn(),
  warn: jest.fn(),
};

let fakeClipboard = '';
Object.assign(navigator, {
  clipboard: {
    writeText: (data: string) => {
      fakeClipboard = data;
    },
    readText: () => {
      return fakeClipboard;
    },
  },
});
