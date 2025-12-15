export const routes = {
  auth: {
    registration: '/auth/registration',
    login: '/auth/login',
    confirmEmail: '/auth/confirm-email',
    logout: '/auth/logout',
  },
  legal: {
    policy: '/legal/policy',
    terms: '/legal/terms',
  },
  feed: '/feed',
  create: '/create',
  profile: '/profile',
  messenger: '/messenger',
  search: '/search',
  statistics: '/statistics',
  favorites: '/favorites',
} as const;
