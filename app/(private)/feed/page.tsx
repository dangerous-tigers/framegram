'use client';
import { Pagination } from '@/shared/ui/pagination/Pagination';
import { useState } from 'react';

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('10');

  const totalPages = 20; // приходит с бэка
  return (
    <div>
      feed
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => {
          if (page < 1 || page > totalPages) return;
          setCurrentPage(page);
        }}
        pageSize={pageSize}
        onPageSizeChange={(value) => {
          setPageSize(value);
          setCurrentPage(1); // ⚠️ важно
        }}
      />
    </div>
  );
}
