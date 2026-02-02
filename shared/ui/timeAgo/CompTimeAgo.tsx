'use client';

import { useLocale } from 'next-intl';
import ReactTimeAgo from 'react-time-ago';

import { mapTimeAgoLocale } from '../../lib/';

import './timeAgo';

export default function CompTimeAgo({ date }: { date: Date }) {
  const locale = useLocale();

  const timeAgoLocale = mapTimeAgoLocale(locale);

  return (
    <ReactTimeAgo
      date={date}
      locale={timeAgoLocale}
    />
  );
}
