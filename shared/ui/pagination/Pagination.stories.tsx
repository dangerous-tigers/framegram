import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Pagination } from './Pagination';
import { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Shared/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
    },
    totalPages: {
      control: { type: 'number', min: 1 },
    },
    onPageChange: { action: 'pageChanged' },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// Компонент-обёртка для интерактивных историй
const PaginationWithState = ({ totalPages = 10 }: { totalPages?: number }) => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => setCurrentPage(page)}
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
