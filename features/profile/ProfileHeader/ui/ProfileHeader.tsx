'use client';
import { Paid } from '@/assets/icons';
import profile_img_placeholder from '@/assets/illustrations/avatar-placeholder.png';
import { UserProfileByIdWithPostsResponse } from '@/entities/profile';
import { routes } from '@/shared/config/routes';
import { PolymorphicButton } from '@/shared/ui/buttonComponent';
import Link from 'next/link';
import s from './ProfileHeader.module.scss';

type Props = {
  isOwner: boolean;
  hasPaymentSubscription: boolean;
  profile: UserProfileByIdWithPostsResponse;
};

export const ProfileHeader = ({ isOwner, profile }: Props) => {
  return (
    <div className={s.container}>
      <div className={s.profilePicture}>
        <img
          src={!profile.avatars.length ? profile_img_placeholder.src : profile.avatars?.[0]?.url}
          alt={`${profile.userName}'s profile picture`}
        />
      </div>
      <div className={s.userName}>
        <h2>
          {profile.userName}
          <Paid />
          {/* {profileInformation.hasPaymentSubscription && <Paid />} */}
        </h2>
        <div className={s.name}>
          <span>
            FirstName LastName
            {profile?.firstName} {profile?.lastName}
          </span>
        </div>
      </div>
      <div className={s.counters}>
        <ul>
          <li>
            <Link href={'/publications'}>
              {profile.publicationsCount}
              <span>Publications</span>
            </Link>
          </li>
          <li>
            <Link href={'/followers'}>
              {profile.followersCount}
              <span>Followers</span>
            </Link>
          </li>
          <li>
            <Link href={'/following'}>
              {profile.followingCount}
              <span>Following</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className={s.buttonsBlock}>
        {isOwner ? (
          <PolymorphicButton
            className={s.profileButton}
            variant='secondary'
            as={Link}
            href={'profile/settings'}
          >
            Profile Settings
          </PolymorphicButton>
        ) : profile.isFollowing ? (
          <PolymorphicButton>Unfollow</PolymorphicButton>
        ) : (
          <>
            <PolymorphicButton>Follow</PolymorphicButton>
            <PolymorphicButton
              variant={'secondary'}
              as={Link}
              href={routes.messenger}
            >
              SendMessage
            </PolymorphicButton>
          </>
        )}
      </div>

      <div className={s.bio}>
        {/* <p>{profileInformation.aboutMe}</p> */}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint recusandae illum explicabo, reiciendis molestias
          consequuntur et doloribus! Sed, delectus doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Inventore quo magnam dolorum, vel nulla nam iusto repellendus vero dolorem nemo neque aliquam dicta voluptatem
          doloremque deserunt similique voluptas! Asperiores, expedita!
        </p>
      </div>
    </div>
  );
};
