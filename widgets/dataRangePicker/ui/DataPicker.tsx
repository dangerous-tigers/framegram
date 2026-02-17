import clsx from 'clsx';
import { useState } from 'react';
import { DatePicker } from 'rsuite';

import s from './DataPicker.module.scss';

import { renderWeekendCell } from '@/shared/lib/date/renderWeekendCell';

export const DataRangePicker = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <>
      <DatePicker
        className={clsx(s.dataPicker)}
        ranges={[]}
        value={value}
        onChange={() => setValue(value)}
        shouldDisableDate={(date) => date > new Date()}
        renderCell={renderWeekendCell}
      />
    </>
  );
};
