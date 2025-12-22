export const routes = {
  auth: {
    registration: '/registration',
    login: '/login',
    confirmEmail: '/confirm-email',
    logout: '/logout',
  },

  legal: {
    policy: '/legal/policy',
    terms: '/legal/terms',
  },
  empty: '',
  feed: '/feed',
  create: '/create',
  profile: '/profile',
  messenger: '/messenger',
  search: '/search',
  statistics: '/statistics',
  favorites: '/favorites',
} as const;
