import { Meta } from '@storybook/nextjs-vite';

import { Card } from './index';

const meta: Meta = {
  title: 'Shared/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Дополнительные CSS классы',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

export const Default = {
  render: () => <Card className='flex items-center justify-center'>This is the Card Component</Card>,
};
