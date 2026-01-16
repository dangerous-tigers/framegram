import s from './Profile.module.scss';

import { UserProfileByIdWithPostsResponse } from '@/entities/profile';
import { ProfileHeader } from '@/features/profile/profile-header/ui/ProfileHeader';

type Props = {
  profile: UserProfileByIdWithPostsResponse;
  hasPaymentSubscription: boolean;
};

export const Profile = ({ profile, hasPaymentSubscription }: Props) => {
  return (
    <div className={s.container}>
      <ProfileHeader
        profile={profile}
        hasPaymentSubscription={hasPaymentSubscription}
      />
    </div>
  );
};
