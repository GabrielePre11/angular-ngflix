export const NAV_LIST: { name: string; path?: string; fragment?: string }[] = [
  {
    name: 'All',
    path: '/',
  },
  {
    name: 'Movies',
    path: '/movies',
  },
  {
    name: 'Series',
    path: '/series',
  },
  {
    name: 'Genres',
    fragment: '#genres',
  },
];
