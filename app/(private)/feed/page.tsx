'use client';

import styles from './page.module.scss';

import { PostsList } from '@/widgets/posts-list';

export default function Page() {
  return (
    <div className={styles.feedPage}>
      <PostsList />
    </div>
  );
}
