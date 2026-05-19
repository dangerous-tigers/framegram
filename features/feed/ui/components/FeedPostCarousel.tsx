import Image from 'next/image';
import Link from 'next/link';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { FeedPost } from '../../model/feed.api';

import s from '../FeedPage.module.scss';

export function FeedPostCarousel({ post }: { post: FeedPost }) {
  return (
    <div className={s.sliderWrap}>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={post.images.length > 1}
        pagination={post.images.length > 1 ? { clickable: true } : false}
        spaceBetween={0}
        slidesPerView={1}
        className={s.postSlider}
      >
        {post.images.map((image, idx) => (
          <SwiperSlide key={idx}>
            <Link href={`/profile/${post.ownerId}?postId=${post.id}`}>
              <Image
                src={image.url}
                alt={post.description || 'Post image'}
                width={560}
                height={560}
                className={s.postImage}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
