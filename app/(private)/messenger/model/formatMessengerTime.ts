export const formatMessengerTime = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};
