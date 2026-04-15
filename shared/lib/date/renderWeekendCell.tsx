import { isWeekend } from '@/shared/lib/date/isWeekend';

export const renderWeekendCell = (date: Date) => {
  const style: React.CSSProperties = {};
  if (isWeekend(date)) {
    style.color = 'red';
    style.fontWeight = 'bold';
  }
  return <div style={style}>{date.getDate()}</div>;
};
