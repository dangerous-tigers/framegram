import styles from './Pagination.module.scss';
import { ArrowIosBack, ArrowIosForward } from '@/assets/icons/components';
import { PaginationItem } from '@/shared/ui/pagination/paginationItem/PaginationItem';
import { getPages } from '@/shared/ui/pagination/lib/getPages';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
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
        <button>100</button>
        <p>on page</p>
      </div>
    </div>
  );
};
