import { useEffect, useState } from 'react';

import { paymentsApi } from '@/features/profile/settings/payments/model/payments.api';
import { PaymentTableType } from '@/features/profile/settings/payments/model/PaymentTableType';
import { formatDate } from '@/shared/lib/formatDate';
import { Skeleton } from '@/shared/ui';
import { Pagination } from '@/shared/ui/pagination/Pagination';

import s from './Payments.module.scss';

export const Payments = () => {
  const [payments, setPayments] = useState<PaymentTableType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('10');
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(payments.length / +pageSize);

  const paginatedPayments = payments.slice((currentPage - 1) * +pageSize, currentPage * +pageSize);

  const handlePageSizeChange = (value: string) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    setLoading(true);

    paymentsApi()
      .then((res) => {
        setPayments(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Skeleton />;

  if (payments.length === 0) {
    return <div>Платежей не было</div>;
  }

  return (
    <div className={s.main}>
      <div className={s.title}>
        <div>Date of Payment</div>
        <div>End date of subscription</div>
        <div>Price</div>
        <div> Subscription Type</div>
        <div> Payment Type</div>
      </div>
      {paginatedPayments.map((pay) => {
        return (
          <div
            key={pay.subscriptionId}
            className={s.body}
          >
            <div>{formatDate(pay.dateOfPayment)}</div>
            <div>{formatDate(pay.endDateOfSubscription)}</div>
            <div>${pay.price}</div>
            <div>{pay.subscriptionType.toLowerCase()}</div>
            <div>{pay.paymentType.charAt(0).toUpperCase() + pay.paymentType.slice(1).toLowerCase()}</div>
          </div>
        );
      })}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        className={s.pagination}
      />
    </div>
  );
};
