'use client';

import { useMe } from '@/entities/user/model/useMe';
import { formatLikes } from '@/shared/lib/formatLikes';
import styles from './ProfileHeader.module.scss';

export const ProfileHeader = () => {
  const { data: user } = useMe();

  if (!user) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Использую стандартный метод toLocaleDateString вместо date-fns
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.profileHeader}>
      <div className={styles.avatarSection}>
        {user.avatars && user.avatars.length > 0 ? (
          <img
            src={user.avatars[user.avatars.length - 1].url}
            alt={user.userName}
            className={styles.avatar}
          />
        ) : (
          <div className={styles.defaultAvatar}>
            {user.userName?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      
      <div className={styles.infoSection}>
        <h1 className={styles.userName}>{user.userName}</h1>
        <h2 className={styles.firstNameLastName}>
          {user.firstName} {user.lastName}
        </h2>
        <p className={styles.aboutMe}>{user.aboutMe}</p>
        
        <div className={styles.metadata}>
          <div className={styles.metadataItem}>
            <span className={styles.count}>{formatLikes(user.publications || 0)}</span>
            <span className={styles.label}>публикации</span>
          </div>
          <div className={styles.metadataItem}>
            <span className={styles.count}>{formatLikes(user.followers || 0)}</span>
            <span className={styles.label}>подписчики</span>
          </div>
          <div className={styles.metadataItem}>
            <span className={styles.count}>{formatLikes(user.following || 0)}</span>
            <span className={styles.label}>подписки</span>
          </div>
        </div>
        
        {user.dateOfBirth && (
          <div className={styles.additionalInfo}>
            <p>Дата рождения: {formatDate(user.dateOfBirth)}</p>
            <p>Город: {user.city}</p>
            <p>Страна: {user.country}</p>
          </div>
        )}
      </div>
    </div>
  );
};
