import clsx from 'clsx';
import { useState } from 'react';
import { DatePicker } from 'rsuite';

import s from './DataPicker.module.scss';

import { renderWeekendCell } from '@/shared/lib/date/renderWeekendCell';

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
