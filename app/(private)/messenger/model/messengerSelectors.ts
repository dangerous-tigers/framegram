import { DialogItem, MessageItem } from '../ui/types';

export const getSortedMessages = (messages: MessageItem[]) => {
  return [...messages].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};

export const getSelectedDialog = (dialogs: DialogItem[], myUserId?: number, partnerId?: number) => {
  return dialogs.find((dialog) => {
    const dialogPartnerId = myUserId === dialog.ownerId ? dialog.receiverId : dialog.ownerId;
    return dialogPartnerId === partnerId;
  });
};
