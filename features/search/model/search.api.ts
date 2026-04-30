import { client } from '@/shared/api/client';
import { components } from '@/shared/api/schema';

type SearchUsersResponse = components['schemas']['UserWithPaginationViewDto'] & {
  items: components['schemas']['ProfileViewAfterSearchModel'][];
};

export const SEARCH_PAGE_SIZE = 12;

export const searchApi = {
  getUsers: async ({ search, cursor }: { search: string; cursor?: number }) => {
    const response = await client.GET('/users', {
      params: {
        query: {
          search,
          pageSize: SEARCH_PAGE_SIZE,
          ...(cursor ? { cursor } : {}),
        },
      },
    });

    if (response.error || !response.data) {
      throw new Error('Failed to search users');
    }

    return response.data as SearchUsersResponse;
  },
};
