'use client';

import { ReactNode } from 'react';

import styles from './feed-layout.module.scss';

import { ProfileHeader } from '@/features/profile/profile-header/ui/ProfileHeader';
import { Sidebar } from '@/widgets/sidebar';

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
        <div className={styles.postsContainer}>{children}</div>
      </main>
    </div>
  );
}
