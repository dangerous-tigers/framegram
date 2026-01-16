export const getPages = (currentPage: number, totalPages: number): (number | string)[] => {
  const pages: (number | string)[] = [];
  const maxVisiblePages = 5; // Максимальное количество видимых цифр

  if (totalPages <= maxVisiblePages) {
    // Если страниц 5 или меньше - показываем все
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Всегда показываем первую страницу
    pages.push(1);

    if (currentPage <= 3) {
      // Показать первые 5 страниц (1 уже добавлен)
      for (let i = 2; i <= maxVisiblePages; i++) {
        pages.push(i);
      }
      if (maxVisiblePages < totalPages - 1) {
        pages.push('...');
      }
      if (maxVisiblePages < totalPages) {
        pages.push(totalPages);
      }
    } else if (currentPage >= totalPages - 2) {
      // Показать последние 5 страниц
      pages.push('...');
      for (let i = totalPages - (maxVisiblePages - 1); i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Показать первую, многоточие, 3 текущие, многоточие, последнюю
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }
  }

  return pages;
};
