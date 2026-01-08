import { ProfileWrapper } from '@/features/profile/ProfileWrapper';
export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = Number(id);

  const getProfile = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/public-user/profile/${id}`);

    return await response.json();
  };

  const { userName, hasPaymentSubscription } = await getProfile();

  return (
    <ProfileWrapper
      userName={userName}
      hasPaymentSubscription={hasPaymentSubscription}
    />
  );
}
