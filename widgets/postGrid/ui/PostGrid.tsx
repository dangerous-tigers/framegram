'use client'; // обязательно для Swiper

import clsx from 'clsx';
import Image from 'next/image';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import s from './PostsGrid.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type PostImage = {
  url: string;
};

type Post = {
  id: string;
  userName: string;
  description: string;
  createdAt: string;
  images: PostImage[];
  avatarOwner: string | null;
};

type Props = {
  posts?: Post[];
};

export const PostsGrid = ({ posts }: Props) => {
  if (!posts?.length) return null;

  return (
    <div className={clsx(s.postsGrid)}>
      {posts.map((post) => (
        <article
          key={post.id}
          className={clsx(s.post)}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
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

          <div className={clsx(s.postInfo)}>
            <div className={clsx(s.postInfoTop)}>
              {post.avatarOwner && (
                <img
                  src={post.avatarOwner}
                  alt=''
                  className={clsx(s.postAvatar)}
                />
              )}
              <p className={clsx(s.postName)}>{post.userName}</p>
            </div>

            <p>{post.description}</p>
            <span className='text-gray-500'>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </article>
      ))}
    </div>
  );
};
