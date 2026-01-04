'use client';
import { UserProfileByIdWithPostsResponse } from '@/entities/profile';
import { ProfileHeader } from '@/features/profile/ProfileHeader/ui/ProfileHeader';

type Props = {
  isOwner: boolean;
  profile: UserProfileByIdWithPostsResponse;
  hasPaymentSubscription: boolean;
};

export const Profile = ({ profile, hasPaymentSubscription, isOwner }: Props) => {
  return (
    <div>
      <ProfileHeader
        isOwner={isOwner}
        profile={profile}
        hasPaymentSubscription={hasPaymentSubscription}
      />
    </div>
  );
};
