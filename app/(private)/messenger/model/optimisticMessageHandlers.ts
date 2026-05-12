import { SocketMessagePayload } from '@/features/messenger/api/useMessengerSocket';

import { OptimisticMessage } from '../ui/types';

type RemoveArgs = {
  payload: SocketMessagePayload;
  meUserId?: number;
  partnerId?: number;
};

export const removeOptimisticMessageByPayload = (
  prev: OptimisticMessage[],
  { payload, meUserId, partnerId }: RemoveArgs,
): OptimisticMessage[] => {
  if (!partnerId || !meUserId) {
    return prev;
  }

  if (payload.ownerId !== meUserId || payload.receiverId !== partnerId) {
    return prev;
  }

  const index = prev.findIndex((item) => item.messageText === payload.messageText);

  if (index === -1) {
    return prev;
  }

  return prev.filter((_, idx) => idx !== index);
};

export const markFirstSendingAsFailed = (prev: OptimisticMessage[]) => {
  const index = prev.findIndex((item) => item.status === 'sending');

  if (index === -1) {
    return prev;
  }

  return prev.map((item, idx) => (idx === index ? { ...item, status: 'failed' as const } : item));
};
