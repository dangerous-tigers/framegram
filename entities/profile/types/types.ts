import { Nullable } from '@/shared/types/types';

export type PublicProfileViewModelResponse = {
  id: number;
  userName: string;
  aboutMe: string;
  avatars: AvatarView[];
  userMetadata: UserMetadata;
  hasPaymentSubscription: boolean;
  isFollowing?: boolean;
  isFollowedBy?: boolean;
};

export type UserProfileByIdWithPostsResponse = {
  id: number;
  userName: string;
  firstName: Nullable<string>;
  lastName: Nullable<string>;
  city: Nullable<string>;
  country: Nullable<string>;
  region: Nullable<string>;
  dateOfBirth: Nullable<string>;
  aboutMe: Nullable<string>;
  avatars: AvatarView[];
  isFollowing: boolean;
  isFollowedBy: boolean;
  followingCount: number;
  followersCount: number;
  publicationsCount: number;
};

export type AvatarView = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt?: string; //date-time
};

export type UserMetadata = {
  following: number;
  followers: number;
  publications: number;
};

export type PostImageViewModel = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt?: string;
  uploadId: string;
};

export type PostViewModel = {
  id: number;
  userName: string;
  description: string;
  location: string;
  images: PostImageViewModel[];

  createdAt: string;
  updatedAt: string;
  ownerId: number;
  avatarOwner: string;

  owner: {
    firstName: string;
    lastName: string;
  };
  likesCount: number;
  isLiked: boolean;
  example?: true;
  avatarWhoLikes: string[];
};

export type PostsByUserId = {
  totalCount: number;
  pageSize: number;
  items: PostViewModel[];
  totalUsers: number;
  notReadCount?: number;
};

export type UpdateProfileUser = {
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  region: string;
  dateOfBirth: string;
  aboutMe: Nullable<string>;
};
export type ProfileSettingsViewModel = {
  id: number;
  userName: string;
  firstName: Nullable<string>;
  lastName: Nullable<string>;

  city: Nullable<string>;
  country: Nullable<string>;
  region: Nullable<string>;
  dateOfBirth: Nullable<string>;
  aboutMe: Nullable<string>;
  avatars: AvatarView[];
  createdAt?: string;
};
