'use client';

import { PostsList } from '@/widgets/posts-list';
import styles from './page.module.scss';

export default function Page() {
  return (
    <div className={styles.feedPage}>
      <PostsList />
    </div>
  );
}
