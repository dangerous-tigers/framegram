'use client';
import { Paid } from '@/assets/icons';
import { PublicProfileViewModelResponse, UserProfileByIdWithPostsResponse } from '@/entities/profile';
import { useMe } from '@/entities/user/model/useMe';
import { routes } from '@/shared/config/routes';
import { Button } from '@/shared/ui';
import Link from 'next/link';
import s from './ProfileHeader.module.scss';

type Props = {
  profileInformation: PublicProfileViewModelResponse;
  profileData: UserProfileByIdWithPostsResponse;
};

export const ProfileHeader = ({ profileInformation, profileData }: Props) => {
  const { data: owner } = useMe();

  return (
    <div className={s.profileWrapper}>
      <div className={s.profilePicture}>
        <img
          src={profileInformation?.avatars?.[0]?.url}
          alt={`${profileInformation.userName}'s profile picture`}
        />
        <div className={s.countersMobile}>
          <ul>
            <li>
              <Link href={'/publications'}>
                {profileInformation.userMetadata.publications}
                <span>Publications</span>
              </Link>
            </li>
            <li>
              <Link href={'/followers'}>
                {profileInformation.userMetadata.followers}
                <span>Followers</span>
              </Link>
            </li>
            <li>
              <Link href={'/following'}>
                {profileInformation.userMetadata.following}
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
              {profileInformation?.userName}
              <Paid />
            </h2>
            {/* {profileInformation.hasPaymentSubscription && <Paid />} */}
            <div className={s.name}>
              <span>
                Firsname LastName
                {profileData.firstName} {profileData.lastName}
              </span>
            </div>
          </div>

          {owner?.userId === profileInformation.id ? (
            <Button>
              <Link href={routes.messenger}>Profile Settings</Link>
            </Button>
          ) : (
            <div className={s.buttonsBlock}>
              {profileInformation.isFollowing ? (
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
                {profileInformation.userMetadata.publications}
                <span>Publications</span>
              </Link>
            </li>
            <li>
              <Link href={'/followers'}>
                {profileInformation.userMetadata.followers}
                <span>Followers</span>
              </Link>
            </li>
            <li>
              <Link href={'/following'}>
                {profileInformation.userMetadata.following}
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
