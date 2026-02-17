import clsx from 'clsx';
import { useState } from 'react';
import { DateRangePicker } from 'rsuite';

import s from './DataPicker.module.scss';

import { renderWeekendCell } from '@/shared/lib/date/renderWeekendCell';

export const DataRangePicker = () => {
  const [value, setValue] = useState<[Date, Date] | null>(null);

  const handleChange = (next: [Date, Date] | null) => {
    setValue(next);
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
        renderCell={renderWeekendCell}
      />
    </>
  );
};
