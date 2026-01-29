import { DateRangePicker } from 'react-date-range';
// import { useState } from 'react';

export const DataPicer = () => {
  /*const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);*/

  /* const handleSelect = (ranges:any) => {
    setState([ranges.selection]);
    // {
    //   startDate: [native Date Object],
    //   endDate: [native Date Object],
    //   key: 'selection'
    // }
  };*/

  return (
    <div>
      <DateRangePicker
        moveRangeOnFirstSelection={false} // Prevents moving to the end date selection immediately
        months={2} // Displays two months at once
        direction='horizontal' // Displays calendars side by side
      />
    </div>
  );
};
