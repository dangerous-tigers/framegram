import type { SchemaProfileViewAfterSearchModel } from '@/shared/api/schema';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { UserSearchResultCard } from './UserSearchResultCard';

const meta: Meta<typeof UserSearchResultCard> = {
  title: 'Features/UserSearchResultCard',
  component: UserSearchResultCard,
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      return (
        <QueryClientProvider client={queryClient}>
          <div style={{ maxWidth: '400px', padding: '20px' }}>
            <Story />
          </div>
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof UserSearchResultCard>;

const mockUser: SchemaProfileViewAfterSearchModel = {
  id: 1,
  userName: 'testuser123',
  firstName: 'Test',
  lastName: 'User',
  avatars: [
    {
      url: 'https://via.placeholder.com/80',
      width: 80,
      height: 80,
      fileSize: 5000,
    },
  ],
  createdAt: '2024-01-01T00:00:00Z',
};

const mockUserWithoutAvatar: SchemaProfileViewAfterSearchModel = {
  ...mockUser,
  userName: 'userwithouavi',
  avatars: [],
};

export const Default: Story = {
  args: {
    user: mockUser,
  },
};

export const WithoutAvatar: Story = {
  args: {
    user: mockUserWithoutAvatar,
  },
};

export const WithLongName: Story = {
  args: {
    user: {
      ...mockUser,
      firstName: 'VeryLongFirstName',
      lastName: 'VeryLongLastName',
      userName: 'verylongusernamethatcanbeextended',
    },
  },
};

export const MinimalInfo: Story = {
  args: {
    user: {
      ...mockUser,
      firstName: '',
      lastName: '',
    },
  },
};
