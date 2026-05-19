export const messengerKeys = {
  all: ['messenger'] as const,
  dialogs: (searchName: string) => [...messengerKeys.all, 'dialogs', { searchName }] as const,
  dialog: (dialoguePartnerId: number) => [...messengerKeys.all, 'dialog', dialoguePartnerId] as const,
};
