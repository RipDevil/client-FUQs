import { checkSlash } from 'api/lib';

test('Check slash function tests', () => {
  const results = [
    checkSlash(''),
    checkSlash('test'),
    checkSlash('test/'),
    checkSlash('/test/'),
    checkSlash('//'),
    checkSlash('/test/test'),
  ];

  results.forEach((item) => {
    expect(item.startsWith('/')).toBeTruthy();
  });
});
