import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { UserSearch } from './UserSearch';

const meta: Meta<typeof UserSearch> = {
  title: 'Features/UserSearch',
  component: UserSearch,
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
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof UserSearch>;

export const Default: Story = {
  args: {},
};

export const WithSearchResults: Story = {
  args: {},
  render: () => (
    <div style={{ padding: '20px' }}>
      <UserSearch />
    </div>
  ),
};
