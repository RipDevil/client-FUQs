import { routes } from 'pages';

const ROUTES_COUNT = 4;
const LISTED_ROUTES = ['/', '/fuq/:id', '/badmin'];

test('Get a proper list of routes', () => {
  const result = routes();

  expect(result.length).toBe(ROUTES_COUNT);

  let realRoutes = 0;
  LISTED_ROUTES.forEach((item) => {
    expect(result.some((route) => route.path === item, realRoutes++)).toBeTruthy();
  });

  // because there are ALL ROUTES - 1 real pages. Other pages are 404
  expect(realRoutes).toBe(ROUTES_COUNT - 1);
});
