import { ArrowIosBack, ArrowIosForward } from '@/assets/icons/components';
import { getPages } from '@/shared/ui/pagination/lib/getPages';
import { pageSizeOptions } from '@/shared/ui/pagination/model/pageSizeOptions';
import { PaginationItem } from '@/shared/ui/pagination/paginationItem/PaginationItem';
import { Select } from '@/shared/ui/select/Select';

import styles from './Pagination.module.scss';

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: string;
  onPageSizeChange: (value: string) => void;
};

export const Pagination: React.FC<Props> = (props) => {
  const { onPageSizeChange, onPageChange, pageSize, totalPages, currentPage } = props;
  const pages = getPages(currentPage, totalPages);

  return (
    <div className={styles.wrapper}>
      <PaginationItem
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        ariaLabel='Previous page'
        tabIndex={currentPage === 1 ? -1 : 0}
      >
        <ArrowIosBack />
      </PaginationItem>
      {pages.map((page, i) => (
        <PaginationItem
          key={i}
          active={page === currentPage}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          ariaLabel={`Page: ${page}`}
          tabIndex={typeof page === 'string' ? -1 : 0}
        >
          {page}
        </PaginationItem>
      ))}

      <PaginationItem
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        ariaLabel='Next page'
        tabIndex={currentPage === totalPages ? -1 : 0}
      >
        <ArrowIosForward />
      </PaginationItem>
      <div className={styles.show}>
        <p>Show</p>
        <Select
          options={pageSizeOptions}
          value={pageSize}
          onValueChange={onPageSizeChange}
          disabled={false}
          variant='text'
          width='52px'
        />
        <p>on page</p>
      </div>
    </div>
  );
};
