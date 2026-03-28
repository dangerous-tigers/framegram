import { useState } from 'react';
import clsx from 'clsx';
import { DateRangePicker } from 'rsuite';

import { renderWeekendCell } from '@/shared/lib/date/renderWeekendCell';

import s from './DataPicker.module.scss';

type Props = {
  disabled?: boolean;
  className?: string;
};

export const DataRangePicker = ({ disabled, className }: Props) => {
  const [value, setValue] = useState<[Date, Date] | null>(null);

  const handleChange = (next: [Date, Date] | null) => {
    setValue(next);
  };

  return (
    <>
      <DateRangePicker
        showHeader={false}
        className={clsx(s.dataPicker, className)}
        showOneCalendar
        ranges={[]}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        renderCell={renderWeekendCell}
      />
    </>
  );
};
