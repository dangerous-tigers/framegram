import s from './UserCounter.module.scss';
import clsx from 'clsx';

export const UserCounter = () => {
  const countUser = 9213;
  const arrayOfDigits1 = Array.from(String(countUser), Number);

  return (
    <div className={clsx(s.userCounter)}>
      <p className={clsx(s.title)}>Registered users:</p>
      <div className={clsx(s.counter)}>
        {arrayOfDigits1.map((digit, i) => (
          <span key={i}>{digit}</span>
        ))}
      </div>
    </div>
  );
};
