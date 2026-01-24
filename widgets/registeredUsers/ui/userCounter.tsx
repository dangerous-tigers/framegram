import clsx from 'clsx';

import s from './UserCounter.module.scss';

type Props = {
  count?: number;
};

export const UserCounter = ({ count = 0 }: Props) => {
  const countArray = count.toString().padStart(6, '0').split('');

  return (
    <div className={clsx(s.userCounter)}>
      <p className={clsx(s.title)}>Registered users:</p>
      <div className={clsx(s.counter)}>
        {countArray.map((digit, index) => (
          <span
            key={index}
            className={clsx(s.number)}
          >
            {digit}
          </span>
        ))}
      </div>
    </div>
  );
};
