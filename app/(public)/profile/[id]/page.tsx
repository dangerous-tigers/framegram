import { postApi } from '@/entities/post/api/post.api';
import { Profile } from '@/features/profile';

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ postId?: string }>;
}) {
  const [{ id }, { postId }] = await Promise.all([params, searchParams]);

  const getProfileByUserId = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/public-user/profile/${id}`).then((res) =>
    res.json(),
  );

  const profileByUserName = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/users/${getProfileByUserId.userName}`).then(
    (res) => res.json(),
  );

  let post = null;
  if (postId) {
    try {
      post = await postApi.getPostByIdServer(+postId);
    } catch {
      post = null;
    }
  }

  return (
    <Profile
      profile={profileByUserName}
      hasPaymentSubscription={getProfileByUserId.hasPaymentSubscription}
      userId={getProfileByUserId.userName}
      post={post}
    />
  );
}
