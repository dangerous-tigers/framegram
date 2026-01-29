import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { TruncatedDescription } from '@/entities/post/ui/TruncatedDescription';
import { PostViewModel } from '@/entities/profile';
import CompTimeAgo from '@/shared/ui/timeAgo/CompTimeAgo';
import s from '@/widgets/postGrid/ui/PostsGrid.module.scss';

type Props = {
  post: PostViewModel;
  expanded?: boolean;
  toggleExpanded: (id: number) => void;
};

export const MainPost = ({ post, expanded, toggleExpanded }: Props) => {
  return (
    <article
      key={post.id}
      className={clsx(s.post)}
    >
      <div className={clsx(expanded ? s.swiperSmall : s.swiperLarge)}>
        <Link href={`/profile/${post.ownerId}?postId=${post.id}`}>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={post.images.length > 1}
            pagination={post.images.length > 1 ? { clickable: true } : false}
            spaceBetween={10}
            slidesPerView={1}
            className={s.postSlider}
          >
            {post.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <Image
                  src={img.url}
                  alt={post.description || 'Post image'}
                  width={300}
                  height={300}
                  className={clsx(s.postImage)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Link>
      </div>

      <div className={clsx(s.postInfoTop)}>
        {post.avatarOwner && (
          <img
            src={post.avatarOwner}
            alt=''
            className={clsx(s.postAvatar)}
          />
        )}
        <Link href={`/profile/${post.ownerId}`}>
          <p className={clsx(s.postName)}>{post.userName}</p>
        </Link>
      </div>

      <p className={clsx(s.postData)}>
        <CompTimeAgo date={new Date(post.createdAt)} />
      </p>

      <div className={s.postDescription}>
        <TruncatedDescription
          text={post.description}
          expanded={expanded}
          onToggle={() => toggleExpanded(post.id)}
        />
      </div>
    </article>
  );
};
