import { PostsByUserId, PublicProfileViewModelResponse } from '@/entities/profile';
import { Profile } from '@/features/profile';

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [getPostByUser, getProfileByUserId] = await Promise.all<
    [Promise<PostsByUserId>, Promise<PublicProfileViewModelResponse>]
  >([
    fetch(`${process.env.NEXT_PUBLIC_BASEURL}/posts/user/${id}/?pageSize=${12}`).then((res) => res.json()),
    fetch(`${process.env.NEXT_PUBLIC_BASEURL}/public-user/profile/${id}`).then((res) => res.json()),
  ]);

  const profileByUserName = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/users/${getProfileByUserId.userName}`).then(
    (res) => res.json(),
  );

  return (
    <Profile
      items={getPostByUser.items}
      profile={profileByUserName}
      hasPaymentSubscription={getProfileByUserId.hasPaymentSubscription}
    />
  );
}
