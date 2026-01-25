import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { TruncatedDescription } from '@/entities/post/ui/TruncatedDescription';
import CompTimeAgo from '@/shared/ui/timeAgo/CompTimeAgo';
import s from '@/widgets/postGrid/ui/PostsGrid.module.scss';

type PostImage = {
  url: string;
};

export type Post = {
  id: string;
  userName: string;
  description: string;
  createdAt: string;
  images: PostImage[];
  avatarOwner: string | null;
};

type Props = {
  post: Post;
  expanded?: boolean;
  toggleExpanded: (id: string) => void;
};

export const MainPost = ({ post, expanded, toggleExpanded }: Props) => {
  const router = useRouter();

  return (
    <article
      key={post.id}
      className={clsx(s.post)}
    >
      <div className={clsx(expanded ? s.swiperSmall : s.swiperLarge)}>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
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
      </div>

      <div className={clsx(s.postInfoTop)}>
        {post.avatarOwner && (
          <img
            src={post.avatarOwner}
            alt=''
            className={clsx(s.postAvatar)}
          />
        )}
        <p
          className={clsx(s.postName)}
          onClick={() => router.push(`/post/${post.id}`)}
        >
          {post.userName}
        </p>
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
