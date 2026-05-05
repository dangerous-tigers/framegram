export type DialogItem = {
  id: number;
  ownerId: number;
  receiverId: number;
  userName: string;
  messageText: string;
  createdAt: string;
  avatars?: Array<{ url: string }>;
};

export type MessageItem = {
  id: number;
  ownerId: number;
  messageText: string;
  createdAt: string;
  status: string;
};

export type OptimisticMessage = {
  id: string;
  messageText: string;
  status: 'sending' | 'failed';
};
