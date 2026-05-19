export type Post = {
  id: number;
  avatarOwner: string;
  userName: string;
  images: { url: string }[];
  description: string;
  createdAt: string;
  likesCount: number;
  isLiked: boolean;
  avatarWhoLikes: string[];
  ownerId: number;
};

export type Comment = {
  id: number;
  postId: number;
  from: UserPreview;
  content: string;
  createdAt: string;
  answerCount: number;
  likeCount: number;
  isLiked: boolean;
};

export type Answer = {
  id: number;
  commentId: number;
  from: UserPreview;
  content: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
};

export type UserPreview = {
  id: number;
  username: string;
  avatars: Record<string, never>[];
};

export type PaginatedResponse<TItem> = {
  pageSize: number;
  totalCount: number;
  notReadCount: number;
  items: TItem[];
};

export type PostCommentsResponse = PaginatedResponse<Comment>;
export type CommentAnswersResponse = PaginatedResponse<Answer>;
export type Avatar = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
};

export type UserItem = {
  id: number;
  userId: number;
  userName: string;
  createdAt: string;
  avatars: Avatar[];
  isFollowing: boolean;
  isFollowedBy: boolean;
};

export type ResponseLikesType = {
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
  prevCursor: number | null;
  nextCursor: number | null;
  items: UserItem[];
  isLiked: boolean;
};
