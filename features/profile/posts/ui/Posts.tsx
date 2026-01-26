import Link from 'next/link';

import s from './Posts.module.scss';

import { PostViewModel } from '@/entities/profile';

export const Posts = ({ items }: { items: PostViewModel[] }) => {
  return (
    <ul className={s.container}>
      {items?.map((item) => (
        <li key={item?.id}>
          <Link href={`/post/${item.id}`}>
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
