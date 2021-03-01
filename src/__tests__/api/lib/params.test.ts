import { preparePostParams } from 'api/lib';

describe('Prepare post params tests', () => {
  it('Should return a proper URLSearchParams object', () => {
    const fakeParams = {
      test: '1',
      test2: '2',
      test3: '3',
      test4: '4',
      test5: '5',
      test6: 'buzz',
      test7: '7',
      test8: '8',
      test9: 'fizz',
    };

    const res = preparePostParams(fakeParams);

    let presentedAsString = '';
    Object.keys(fakeParams).forEach((key) => {
      expect(res.has(key)).toBeTruthy();
      presentedAsString += (presentedAsString.length ? '&' : '') + `${key}=${res.get(key)}`;
    });

    expect(res.toString()).toBe('test=1&test2=2&test3=3&test4=4&test5=5&test6=buzz&test7=7&test8=8&test9=fizz');
  });

  it('Should return an empty URLSearchParams if the params parameter is an empty object', () => {
    const res = preparePostParams({});
    expect(res.toString()).toBe('');
  });
});
