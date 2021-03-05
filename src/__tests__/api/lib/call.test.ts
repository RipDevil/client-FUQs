import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { call } from 'api/lib';

type FAKE_RES_TYPE = {
  some: string;
};

const FAKE_API = '/api';
const FAKE_RES: FAKE_RES_TYPE = { some: 'data' };

let mockAxios: any;

beforeAll(() => {
  mockAxios = new MockAdapter(axios);
});

afterEach(() => {
  mockAxios.reset();
});

// TODO: is there a better way to test an api call function?
describe('Api call test', () => {
  it('On any success', async () => {
    mockAxios.onAny(FAKE_API).reply(200, FAKE_RES);

    const results = [
      await call<FAKE_RES_TYPE>(FAKE_API, 'GET'),
      await call<FAKE_RES_TYPE>(FAKE_API, 'GET', { param: '1' }),
      await call<FAKE_RES_TYPE>(FAKE_API, 'GET', { param: '1' }, 'TOKEN_SAMPLE'),
    ];

    results.forEach((result) => {
      expect(result).toMatchObject(FAKE_RES);
    });
  });

  it('On any error', async () => {
    mockAxios.onAny(FAKE_API).reply(404);

    try {
      await call<FAKE_RES_TYPE>(FAKE_API, 'POST', { param: '1' });
    } catch (e) {
      expect(e.isAxiosError).toBeTruthy();
      expect(e.response.status).toEqual(404);
    }
  });
});
