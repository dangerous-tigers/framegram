import clsx from 'clsx';
import { useState } from 'react';
import { DateRangePicker, DatePicker } from 'rsuite';

import s from './DataPicker.module.scss';

export const DataRangePicker = () => {
  const [value, setValue] = useState<[Date, Date] | null>(null);

  const handleChange = (next: [Date, Date] | null) => {
    localStorage.setItem('draft:', JSON.stringify(next));
    setValue(next);
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 = воскресенье, 6 = суббота
  };

  // const handleChange = (nextValue: [Date, Date] | null) => {
  //   setValue(nextValue);
  // };

  const handleClean = () => {
    setValue(null);
  };

  return (
    <>
      <DateRangePicker
        showHeader={false}
        className={clsx(s.dataPicker)}
        showOneCalendar
        ranges={[]}
        value={value}
        disabled={false}
        onChange={handleChange}
        onClean={handleClean}
        renderCell={(date) => {
          const style: React.CSSProperties = {};
          if (isWeekend(date)) {
            style.color = 'red';
            style.fontWeight = 'bold';
          }
          return <div style={style}>{date.getDate()}</div>;
        }}
      />

      <hr />
      <br />
      <hr />
      <DatePicker
        className={clsx(s.dataPicker)}
        ranges={[]}
      />
      <hr />
      <br />
      <hr />

      <DateRangePicker
        className={clsx(s.dataPicker)}
        showHeader={false}
        format='dd/MM/yyyy'
        cleanable={false}
        block
        ranges={[]}
      />
    </>
  );
};
