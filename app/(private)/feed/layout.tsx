'use client';

import { ReactNode } from 'react';
import { Sidebar } from '@/widgets/sidebar';
import { ProfileHeader } from '@/features/profile/ProfileHeader/ui/ProfileHeader';
import styles from './feed-layout.module.scss';

export default function FeedLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className={styles.feedLayout}>
      <aside className={styles.leftSidebar}>
        <Sidebar />
      </aside>
      
      <main className={styles.mainContent}>
        <div className={styles.profileHeader}>
          <ProfileHeader />
        </div>
        <div className={styles.postsContainer}>
          {children}
        </div>
      </main>
    </div>
  );
}