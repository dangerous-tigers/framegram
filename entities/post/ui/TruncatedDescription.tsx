import { useTranslations } from 'next-intl';

import s from './TruncatedDescription.module.scss';

interface TruncatedDescriptionProps {
  text: string;
  wordLimit?: number;
  expanded?: boolean;
  onToggle?: () => void;
}

export const TruncatedDescription = ({
  text,
  wordLimit = 13,
  expanded = false,
  onToggle,
}: TruncatedDescriptionProps) => {
  const t = useTranslations('mainPagePost');
  const words = text.split(' ');
  const isTruncated = words.length > wordLimit;
  const displayedText = expanded || !isTruncated ? text : words.slice(0, wordLimit).join(' ') + '...';

  return (
    <div className={s.text}>
      {displayedText}
      {isTruncated && onToggle && (
        <span
          className={s.showMoreBtn}
          onClick={onToggle}
        >
          {expanded ? t('Hide') : t('ShowMore')}
        </span>
      )}
    </div>
  );
};
