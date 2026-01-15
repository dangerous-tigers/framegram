'use client';

import { useQuery } from '@tanstack/react-query';

import { useMe } from '@/entities/user/model/useMe';
import { Profile } from '@/features/profile/Profile';
import { client } from '@/shared/api/client';

type Props = {
  userName: string;
  hasPaymentSubscription: boolean;
};

export const ProfileWrapper = ({ userName, hasPaymentSubscription }: Props) => {
  const { data } = useMe();

  const { data: profile } = useQuery({
    queryKey: ['owner'],
    queryFn: async () =>
      await client.GET('/users/{userName}', {
        params: {
          path: {
            userName,
          },
        },
      }),
  });

  if (!profile?.data) return <div>Unauthorized</div>;

  return (
    <Profile
      isOwner={data?.userId === profile?.data?.id}
      profile={profile?.data}
      hasPaymentSubscription={hasPaymentSubscription}
    />
  );
};
