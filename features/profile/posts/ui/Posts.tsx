import Link from 'next/link';

import { PostViewModel } from '@/entities/profile';

import s from './Posts.module.scss';

export const Posts = ({ items }: { items: PostViewModel[] }) => {
  return (
    <ul className={s.container}>
      {items?.map((item) => (
        <li key={item?.id}>
          <Link
            href={`?postId=${item.id}`}
            scroll={false}
          >
            <img
              src={item.images && item?.images[0]?.url}
              alt={`post image by id ${item?.images[0]?.uploadId}`}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};
