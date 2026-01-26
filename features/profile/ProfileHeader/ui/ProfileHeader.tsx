'use client';
import Link from 'next/link';

import s from './ProfileHeader.module.scss';

import { Paid } from '@/assets/icons';
import { UserProfileByIdWithPostsResponse } from '@/entities/profile';
import { routes } from '@/shared/config/routes';
import { Button } from '@/shared/ui';

type Props = {
  isOwner: boolean;
  hasPaymentSubscription: boolean;
  profile: UserProfileByIdWithPostsResponse;
};

export const ProfileHeader = ({ isOwner, profile }: Props) => {
  return (
    <div className={s.profileWrapper}>
      <div className={s.profilePicture}>
        <img
          src={profile.avatars?.[0]?.url}
          alt={`${profile.userName}'s profile picture`}
        />
        <div className={s.countersMobile}>
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
            <li></li>
          </ul>
        </div>
      </div>
      <div className={s.content}>
        <div className={s.userInfo}>
          <div className={s.userName}>
            <h2>
              {profile.userName}
              <Paid />
              {/* {profileInformation.hasPaymentSubscription && <Paid />} */}
            </h2>
            <div className={s.name}>
              <span>
                Firsname LastName
                {profile?.firstName} {profile?.lastName}
              </span>
            </div>
          </div>

          {isOwner ? (
            <Button
              className={s.profileButton}
              variant='secondary'
            >
              <Link href={routes.messenger}>Profile Settings</Link>
            </Button>
          ) : (
            <div className={s.buttonsBlock}>
              {profile.isFollowing ? (
                <Button>
                  <Link href={routes.messenger}>Unfollow</Link>
                </Button>
              ) : (
                <Button>
                  <Link href={routes.messenger}>Follow</Link>
                </Button>
              )}
              <Button variant={'secondary'}>
                <Link href={routes.messenger}>SendMessage</Link>
              </Button>
            </div>
          )}
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
            <li></li>
          </ul>
        </div>
        <div className={s.bio}>
          {/* <p>{profileInformation.aboutMe}</p> */}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint recusandae illum explicabo, reiciendis
            molestias consequuntur et doloribus! Sed, delectus doloremque. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Inventore quo magnam dolorum, vel nulla nam iusto repellendus vero dolorem nemo neque
            aliquam dicta voluptatem doloremque deserunt similique voluptas! Asperiores, expedita!
          </p>
        </div>
      </div>
    </div>
  );
};
