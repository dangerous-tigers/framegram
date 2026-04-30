import { client } from '@/shared/api/client';
import { components } from '@/shared/api/schema';

export type FeedPostsResponse = components['schemas']['PublicationsFollowersWithPaginationViewModel'];
export type FeedPost = components['schemas']['PostViewModel'];
export type FeedComment = components['schemas']['CommentsViewModel'];

export const FEED_PAGE_SIZE = 6;
export const FEED_COMMENTS_PREVIEW_SIZE = 2;

export const feedApi = {
  getFeedPosts: async ({ pageNumber, endCursorPostId }: { pageNumber: number; endCursorPostId?: number }) => {
    const response = await client.GET('/home/publications-followers', {
      params: {
        query: {
          pageSize: FEED_PAGE_SIZE,
          pageNumber,
          endCursorPostId,
        },
      },
    });

    if (response.error || !response.data) {
      throw new Error('Failed to load feed posts');
    }

    return response.data as FeedPostsResponse;
  },
  getCommentsPreview: async (postId: number) => {
    const response = await client.GET('/posts/{postId}/comments', {
      params: {
        path: { postId },
        query: {
          pageSize: FEED_COMMENTS_PREVIEW_SIZE,
          pageNumber: 1,
          sortDirection: 'desc',
        },
      },
    });

    if (response.error || !response.data) {
      throw new Error('Failed to load post comments');
    }

    return response.data.items ?? [];
  },
  unfollowUser: async (userId: number) => {
    const response = await client.DELETE('/users/follower/{userId}', {
      params: {
        path: { userId },
      },
    });

    if (response.error) {
      throw new Error('Failed to unfollow user');
    }
  },
  followUser: async (selectedUserId: number) => {
    const response = await client.POST('/users/following', {
      body: {
        selectedUserId,
      },
    });

    if (response.error) {
      throw new Error('Failed to follow user');
    }
  },
};
