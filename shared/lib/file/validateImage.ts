export const validateImage = (file: File) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  const maxSize = 20 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    throw new Error('INVALID_FORMAT');
  }

  if (file.size > maxSize) {
    throw new Error('INVALID_SIZE');
  }
};
