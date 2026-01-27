import { Profile } from '@/features/profile';

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const getProfileByUserId = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/public-user/profile/${id}`).then((res) =>
    res.json(),
  );

  const profileByUserName = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/users/${getProfileByUserId.userName}`).then(
    (res) => res.json(),
  );

  return (
    <Profile
      profile={profileByUserName}
      userId={getProfileByUserId.userName}
    />
  );
}
