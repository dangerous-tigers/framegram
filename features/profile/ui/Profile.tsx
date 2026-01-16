import s from './Profile.module.scss';

import { PostViewModel, UserProfileByIdWithPostsResponse } from '@/entities/profile';
import { Posts, ProfileHeader } from '@/features/profile';

type Props = {
  profile: UserProfileByIdWithPostsResponse;
  items: PostViewModel[];
  hasPaymentSubscription: boolean;
};

export const Profile = ({ profile, items, hasPaymentSubscription }: Props) => {
  return (
    <div className={s.container}>
      <ProfileHeader
        profile={profile}
        hasPaymentSubscription={hasPaymentSubscription}
      />
      <Posts items={items} />
    </div>
  );
};
