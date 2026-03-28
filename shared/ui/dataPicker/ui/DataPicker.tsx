import { useState } from 'react';
import clsx from 'clsx';
import { DatePicker } from 'rsuite';

import { renderWeekendCell } from '@/shared/lib/date/renderWeekendCell';

import s from './DataPicker.module.scss';

type Props = {
  disabled?: boolean;
  className?: string;
};

export const DataPicker = ({ disabled, className }: Props) => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <>
      <DatePicker
        className={clsx(s.dataPicker, className)}
        ranges={[]}
        value={value}
        onChange={() => setValue(value)}
        shouldDisableDate={(date) => date > new Date()}
        renderCell={renderWeekendCell}
        disabled={disabled}
      />
    </>
  );
};
