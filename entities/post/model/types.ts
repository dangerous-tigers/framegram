export type Post = {
  id: number;
  userName: string;
  description: string;
  location: string;
  images: PostImage[];
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  avatarOwner: string;
  owner: Owner;
  likesCount: number;
  isLiked: boolean;
  avatarWhoLikes: string[];
};

export type PostImage = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export type Owner = {
  firstName: string;
  lastName: string;
};
