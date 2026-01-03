import { ProfileHeader } from '@/features/profile/ProfileHeader/ui/ProfileHeader';
import { client } from '@/shared/api/client';

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // return <div>Profile by user {id}</div>;
  // const [postsData, publicPofileInformation] = await Promise.all([
  //   await client.GET('/posts/user/{userId}/{endCursorPostId}', {
  //     params: {
  //       path: {userId: Number(id), endCursorPostId: 0},
  //       query: {pageSize: PAGINATION.PAGE_SIZE},
  //     },
  //   }).then(res => res.data),
  //   await client.GET('/public-user/profile/{profileId}', {
  //     params: {
  //       path: {
  //         profileId: Number(id),
  //       },
  //     },
  //   }).then(res => res.data),
  // ]);
  const publicPofileInformation = await client
    .GET('/public-user/profile/{profileId}', {
      params: {
        path: {
          profileId: Number(id),
        },
      },
    })
    .then((res) => res.data);

  if (!publicPofileInformation) {
    return null;
  }

  const userProfileByIdWithPosts = await client
    .GET('/users/{userName}', {
      params: {
        path: { userName: publicPofileInformation?.userName },
      },
    })
    .then((res) => res.data);

  if (!userProfileByIdWithPosts) {
    return null;
  }

  return (
    <div>
      <ProfileHeader
        profileInformation={publicPofileInformation}
        profileData={userProfileByIdWithPosts}
      />
    </div>
  );
}
