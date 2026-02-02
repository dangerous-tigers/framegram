import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Shared/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    totalPages: {
      control: { type: 'number', min: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// 🔹 Обёртка с состоянием
const PaginationWithState = ({ totalPages = 10 }: { totalPages?: number }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('100');

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      pageSize={pageSize}
      onPageChange={setCurrentPage}
      onPageSizeChange={(value) => {
        setPageSize(value);
        setCurrentPage(1); // важно для UX
      }}
    />
  );
};

export const Default: Story = {
  render: () => <PaginationWithState />,
};

export const FewPages: Story = {
  render: () => <PaginationWithState totalPages={5} />,
};

export const ManyPages: Story = {
  render: () => <PaginationWithState totalPages={20} />,
};

export const ThreePages: Story = {
  render: () => <PaginationWithState totalPages={3} />,
};
